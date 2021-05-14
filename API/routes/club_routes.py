from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
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
    cur = get_cursor()
    
    sql = """
            SELECT * FROM club
        """

    cur.execute(sql)
    clubs = cur.fetchmany()
    
    cur.close()

    return individual_club_schema.jsonify([Club(*club) for club in clubs])

@club_api.route('/clubs/<id>', methods=['GET'])
def get_personal_clubs(id):
    cur = get_cursor()

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

    cur.close()

    return club_member_schema.jsonify([ClubUser(*club) for club in clubs])

@club_api.route('/club/create', methods=['POST'])
def create_club():
    con = get_connection()
    cur = get_cursor()

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
    print(club_id[0])

    sql = """
        INSERT INTO club_tag(club_id, topic_id)
        values (:club_id, :topic_id)
    """

    cur.execute(sql, club_id=club_id[0], topic_id=topic_id) # Use the club_id to add it to the topic table

    con.commit()
    cur.close()

    return jsonify(result=True)

@club_api.route('/club/random', methods=['GET'])
def get_random_clubs():
    cur = get_cursor()
    
    sql = """
            SELECT * FROM
            (SELECT *
            FROM club
            ORDER BY dbms_random.value)
            WHERE ROWNUM <= 3
        """

    cur.execute(sql)
    clubs = cur.fetchmany()
    
    cur.close()

    return individual_club_schema.jsonify([Club(*club) for club in clubs])

@club_api.route('/club/announcement/<id>', methods=['GET'])
def get_announcements(id):
    cur = get_cursor()

    sql = """
        SELECT * FROM announcement WHERE club_id = :id
    """

    cur.execute(sql, id=id)
    announcements = cur.fetchmany() # TODO - update query to only return current announcements

    cur.close()

    return announcement_schema.jsonify([Announcement(*ann) for ann in announcements], many=True)

@club_api.route('/club/announcement/create', methods=['POST'])
def create_announcement():
    con = get_connection()
    cur = get_cursor()

    club_id = request.json['club_id']
    announcement_text = request.json['announcement_text']
    created_at = request.json['created_at']
    expires_at = request.json['expires_at']


    sql = """
          INSERT INTO announcement (club_id, announcement_text, created_at, expires_at)
          VALUES (:club_id, :announcement_text, :created_at, :expires_at)
    """

    cur.execute(sql, club_id=club_id, announcement_text=announcement_text, created_at=created_at, expires_at=expires_at)

    con.commit()
    cur.close()

    return jsonify(result=True)

@club_api.route('/club/event/<id>', methods=['GET'])
def get_events(id):
    cur = get_cursor()

    sql = """
        SELECT e.event_id, e.club_id, TO_CHAR(e.event_start, 'HH:MI PM DY MON DD'), TO_CHAR(e.event_end, 'HH:MI PM DY MON DD'), e.event_description, e.img_url, c.club_name
        FROM appevent e
        JOIN club c on c.club_id = e.club_id
        WHERE e.club_id = :id
    """

    cur.execute(sql, id=id)
    tuples = cur.fetchmany() # TODO - update query to only return current events

    cur.close()

    return event_schema.jsonify([Event(*event) for event in tuples], many=True) # Create an array of these events

@club_api.route('/club/<club_id>', methods=['GET'])
def get_club(club_id):
    cur = get_cursor()
    
    sql = """
            SELECT * FROM club
            WHERE club_id = :club_id
        """

    cur.execute(sql, club_id=club_id)
    club = cur.fetchone()    
    cur.close()

    if not club:
        return {"result": "Club does not exist"}
    else:
        return single_club_schema.jsonify(Club(*club)) 

@club_api.route('/club/event/create', methods=['POST'])
def create_event():
    con = get_connection()
    cur = get_cursor()

    club_id = request.json['club_id']
    event_description = request.json['event_description']
    event_start = request.json['event_start']
    event_end = request.json['event_end']


    sql = """
          INSERT INTO appevent (club_id, event_start, event_end, event_description)
          VALUES (:club_id, :event_start, :event_end, :event_description)
    """

    cur.execute(sql, club_id=club_id, event_start=event_start, event_end=event_end, event_description=event_description)

    con.commit()
    cur.close()

    return jsonify(result=True)

@club_api.route('/announcement/delete/<id>', methods=['DELETE'])
def delete_announcement(id):
    con = get_connection()
    cur = get_cursor()

    sql = """
          DELETE FROM announcement
          WHERE announcement_id = :id
    """

    cur.execute(sql, id=id)
    con.commit()
    cur.close()

    return jsonify(result=True)

@club_api.route('/club/members/<club_id>', methods=['GET'])
def get_club_members(club_id):
    cur = get_cursor()
    
    sql = """
            SELECT * FROM club
            WHERE club_id = :club_id
        """

    cur.execute(sql, club_id=club_id)
    club = cur.fetchone()    
    cur.close()

    if not club:
        return {"result": "Club does not exist"}
    else:
        return single_club_schema.jsonify(Club(*club)) 