from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
import cx_Oracle
from schemas.club_schema import club_schema
from models.club_model import Club
from schemas.announcement_schema import announcement_schema
from models.announcement_model import Announcement
from schemas.event_schema import event_schema
from models.event_model import Event

club_api = Blueprint('club_api', __name__)

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

@club_api.route('/club/topics', methods=['GET'])
def get_club_by_topic():
    cur = get_cursor()
    
    sql = """
        SELECT DISTINCT topic_id FROM club_tag
    """

    cur.execute(sql)
    topics = cur.fetchmany()
    
    club_fragments = []
    for topic in topics:
        topic_id = topic[0]

        sql = """
        SELECT ct.club_id, c.club_name, c.club_description
        FROM club_tag ct
        JOIN club c ON c.club_id = ct.club_id
        WHERE ct.topic_id = :topic_id
        """

        cur.execute(sql, topic_id=topic_id)
        clubs = cur.fetchmany()

        cur.execute("SELECT topic_description FROM topic WHERE topic_id = :topic_id", topic_id=topic_id)
        topic = cur.fetchone()
        topic_name = topic[0]

        club_fragments.append({"topic": topic_name, "clubs": [Club(*club) for club in clubs]})

    cur.close()

    return club_schema.jsonify(club_fragments)

@club_api.route('/club/annoucement/<id>', methods=['GET'])
def get_announcements(id):
    cur = get_cursor()

    sql = """
        SELECT * FROM announcement WHERE club_id = :id
    """

    cur.execute(sql, id=id)
    announcements = cur.fetchmany() # TODO - update query to only return current announcements

    cur.close()

    return announcement_schema.jsonify([Announcement(*ann) for ann in announcements], many=True)

@club_api.route('/club/annoucement/create', methods=['POST'])
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
        SELECT * FROM appevent WHERE club_id = :id
    """

    cur.execute(sql, id=id)
    tuples = cur.fetchmany() # TODO - update query to only return current events

    cur.close()

    return event_schema.jsonify([Event(*event) for event in tuples], many=True) # Create an array of these events

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
