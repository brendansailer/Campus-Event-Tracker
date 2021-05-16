from flask import Blueprint, request, jsonify
from database_helpers import get_connection, close
import cx_Oracle
from schemas.club_schema import club_schema, individual_club_schema, single_club_schema, club_member_schema
from models.club_model import Club
from models.club_user_model import ClubUser
from schemas.announcement_schema import announcement_schema
from models.announcement_model import Announcement
from schemas.event_schema import event_schema
from models.event_model import Event

club_api = Blueprint('club_api', __name__)

@club_api.route('/club', methods=['GET'])
def get_clubs():
    con, cur = get_connection()
    
    sql = """
            SELECT * FROM club
        """

    cur.execute(sql)
    clubs = cur.fetchmany()
    
    close(con, cur)

    return individual_club_schema.jsonify([Club(*club) for club in clubs])

@club_api.route('/clubs/<id>', methods=['GET'])
def get_personal_clubs(id):
    con, cur = get_connection()

    sql = """
        SELECT club.club_id, club.club_description, club.club_name, 1
        FROM club, membership
        WHERE membership.user_id = :user_id AND membership.club_id = club.club_id
        UNION
        SELECT club.club_id, club.club_description, club.club_name, 0
        FROM club
        WHERE club.club_id NOT IN 
            (SELECT membership.club_id 
            FROM membership 
            WHERE membership.user_id = :user_id)
    """

    cur.execute(sql, user_id=id)
    clubs = cur.fetchmany()

    close(con, cur)

    return club_member_schema.jsonify([ClubUser(*club) for club in clubs])

@club_api.route('/clubsgrouped/topics/<user_id>', methods=['GET'])
def get_club_by_topic(user_id):
    con, cur = get_connection()

    sql = """
        SELECT DISTINCT topic_id FROM club_tag
    """

    cur.execute(sql)
    topics = cur.fetchmany()

    club_fragments = []
    for topic in topics:
        topic_id = topic[0]

        sql = """
        SELECT ct.club_id, c.club_name, c.club_description, 1
        FROM club_tag ct
        JOIN club c ON c.club_id = ct.club_id
        JOIN membership m ON c.club_id = m.club_id
        WHERE ct.topic_id = :topic_id
        AND   m.user_id = :user_id
        UNION
        SELECT ct.club_id, c.club_name, c.club_description, 0
        FROM club_tag ct
        JOIN club c ON c.club_id = ct.club_id
        WHERE ct.topic_id = :topic_id
        AND   c.club_id NOT IN 
            (SELECT membership.club_id 
            FROM membership 
            WHERE membership.user_id = :user_id)
        """

        cur.execute(sql, topic_id=topic_id, user_id=user_id)
        clubs = cur.fetchmany()

        cur.execute("SELECT topic_description FROM topic WHERE topic_id = :topic_id", topic_id=topic_id)
        topic = cur.fetchone()
        topic_name = topic[0]

        club_fragments.append({"topic": topic_name, "topic_id": topic_id, "clubs": [ClubUser(*club) for club in clubs]})

    close(con, cur)

    return club_schema.jsonify(club_fragments)

@club_api.route('/club/create', methods=['POST'])
def create_club():
    con, cur = get_connection()

    club_name = request.json['club_name']
    club_description = request.json['club_description']
    topic_id = request.json['topic_id']

    club_id_cur = cur.var(cx_Oracle.NUMBER)

    sql = """
        INSERT INTO club(club_name, club_description)
        values (:club_name, :club_description)
        returning club_id into :cur
    """

    cur.execute(sql, club_name=club_name, club_description=club_description, cur=club_id_cur)
    club_id = club_id_cur.getvalue() # Get the newly inserted club_id

    sql = """
        INSERT INTO club_tag(club_id, topic_id)
        values (:club_id, :topic_id)
    """

    cur.execute(sql, club_id=club_id[0], topic_id=topic_id) # Use the club_id to add it to the topic table

    con.commit()
    close(con, cur)
    print(club_id[0])

    return {"club_id": club_id[0]}

@club_api.route('/club/random', methods=['GET'])
def get_random_clubs():
    con, cur = get_connection()
    
    sql = """
            SELECT * FROM
            (SELECT *
            FROM club
            ORDER BY dbms_random.value)
            WHERE ROWNUM <= 3
        """

    cur.execute(sql)
    clubs = cur.fetchmany()
    
    close(con, cur)

    return individual_club_schema.jsonify([Club(*club) for club in clubs])

@club_api.route('/club/announcement/<id>', methods=['GET'])
def get_announcements(id):
    con, cur = get_connection()

    sql = """
        SELECT * FROM announcement WHERE club_id = :id
    """

    cur.execute(sql, id=id)
    announcements = cur.fetchmany() # TODO - update query to only return current announcements

    close(con, cur)

    return announcement_schema.jsonify([Announcement(*ann) for ann in announcements], many=True)

@club_api.route('/club/announcement/create', methods=['POST'])
def create_announcement():
    con, cur = get_connection()

    club_id = request.json['club_id']
    announcement_text = request.json['announcement_text']
    created_at = request.json['created_at']
    expires_at = request.json['expires_at']


    sql = """
        INSERT INTO announcement (club_id, announcement_text, created_at, expires_at)
        VALUES (:club_id, 
            :announcement_text, 
            TO_TIMESTAMP(:created_at, 'dd-mon-yyyy hh24:mi:ss'),
            TO_TIMESTAMP(:expires_at, 'dd-mon-yyyy hh24:mi:ss'))
    """

    cur.execute(sql, club_id=club_id, announcement_text=announcement_text, created_at=created_at, expires_at=expires_at)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@club_api.route('/club/announcement/modify', methods=['POST'])
def modify_announcement():
    con, cur = get_connection()
    print(request.json)
    print("BUFFER")

    text = request.json['announcement_text']
    ann_id = request.json['announcement_id']

    sql = """
        UPDATE announcement
        SET announcement_text = :text
        WHERE announcement_id = :id
    """

    try:
        cur.execute(sql, id=ann_id, text=text)
    except:
        con.commit()
        close(con, cur)
        return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@club_api.route('/club/event/<id>', methods=['GET'])
def get_events(id):
    con, cur = get_connection()

    sql = """
        SELECT e.event_id, e.club_id, e.event_start, e.event_end, e.event_description, e.img_url, c.club_name, e.location, e.title
        FROM appevent e
        JOIN club c on c.club_id = e.club_id
        WHERE e.club_id = :id
    """

    cur.execute(sql, id=id)
    tuples = cur.fetchmany() # TODO - update query to only return current events

    close(con, cur)

    return event_schema.jsonify([Event(*event) for event in tuples], many=True) # Create an array of these events

@club_api.route('/club/<club_id>', methods=['GET'])
def get_club(club_id):
    con, cur = get_connection()
    
    sql = """
            SELECT * FROM club
            WHERE club_id = :club_id
        """

    cur.execute(sql, club_id=club_id)
    club = cur.fetchone()    
    close(con, cur)

    if not club:
        return {"result": "Club does not exist"}
    else:
        return single_club_schema.jsonify(Club(*club)) 

@club_api.route('/club/event/create', methods=['POST'])
def create_event():
    con, cur = get_connection()

    club_id = request.json['club_id']
    event_description = request.json['event_description']
    event_start = request.json['event_start']
    event_end = request.json['event_end']
    location = request.json['location']
    title = request.json['title']

    sql = """
        INSERT INTO appevent (club_id, event_start, event_end, event_description, location, title)
        VALUES (:club_id,
            TO_TIMESTAMP(:event_start, 'dd-mon-yyyy hh24:mi:ss'), 
            TO_TIMESTAMP(:event_end, 'dd-mon-yyyy hh24:mi:ss'),
            :event_description,
            :location,
            :title)
    """

    cur.execute(sql, club_id=club_id, event_start=event_start, event_end=event_end, event_description=event_description, location=location, title=title)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@club_api.route('/club/event/modify', methods=['POST'])
def modify_event():
    con, cur = get_connection()

    event_id = request.json['event_id']
    event_description = request.json['event_description']
    event_start = request.json['event_start']
    event_end = request.json['event_end']
    location = request.json['location']
    title = request.json['title']

    sql = """
        UPDATE appevent
        SET event_start = TO_TIMESTAMP(:event_start, 'dd-mon-yyyy hh24:mi:ss'), event_end = TO_TIMESTAMP(:event_end, 'dd-mon-yyyy hh24:mi:ss'), event_description = :event_description, location = :location, title = :title
        WHERE event_id = :event_id
    """

    cur.execute(sql, event_id=event_id, event_start=event_start, event_end=event_end, event_description=event_description, location=location, title=title)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@club_api.route('/announcement/delete/<id>', methods=['DELETE'])
def delete_announcement(id):
    con, cur = get_connection()

    sql = """
          DELETE FROM announcement
          WHERE announcement_id = :id
    """

    cur.execute(sql, id=id)
    con.commit()
    cur.close()

    return jsonify(result=True)