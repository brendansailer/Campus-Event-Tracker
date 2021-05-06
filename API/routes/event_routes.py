from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
from schemas.event_schema import event_schema
from models.event_model import Event  
from schemas.rsvp_schema import rsvp_schema
from models.rsvp_model import RSVP

event_api = Blueprint('event_api', __name__)

@event_api.route('/event', methods=['GET'])
def get_events():
    cur = get_cursor()

    sql = """
            SELECT e.event_id, e.club_id, TO_CHAR(e.event_start, 'HH:MI PM DY MON DD'), TO_CHAR(e.event_end, 'HH:MI PM DY MON DD'), e.event_description, e.img_url, c.club_name
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
          """

    cur.execute(sql)
    tuples = cur.fetchmany()

    cur.close()

    events = [Event(*event) for event in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return event_schema.jsonify(events, many=True) # Create an array of these events

@event_api.route('/event/<id>', methods=['GET'])
def get_event(id):
    cur = get_cursor()

    sql = """
            SELECT e.event_id, e.club_id, TO_CHAR(e.event_start, 'HH:MI PM DY MON DD'), TO_CHAR(e.event_end, 'HH:MI PM DY MON DD'), e.event_description, e.img_url, c.club_name
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
            WHERE event_id = :id
        """

    cur.execute(sql, id=id)
    event = cur.fetchone()

    cur.close()

    if not event:
        return {"result": "Event does not exist"}
    else:
        return event_schema.jsonify(Event(*event))

@event_api.route('/event/random', methods=['GET'])
def get_event_random():
    cur = get_cursor()

    sql = """
            SELECT * FROM
            (SELECT e.event_id, e.club_id, TO_CHAR(e.event_start, 'HH:MI PM DY MON DD'), TO_CHAR(e.event_end, 'HH:MI PM DY MON DD'), e.event_description, e.img_url, c.club_name
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
            ORDER BY dbms_random.value)
            WHERE ROWNUM <= 3
        """
     
    cur.execute(sql)
    events = cur.fetchmany()

    cur.close()

    return event_schema.jsonify([Event(*event) for event in events], many=True)

@event_api.route('/event/rsvp', methods=['POST'])
def rsvp():
    con = get_connection()
    cur = get_cursor()

    # Get fields from the POST request
    user_id = request.json['user_id']
    event_id = request.json['event_id']
    likelihood = request.json['likelihood']

    sql = """
        INSERT INTO rsvp(user_id, event_id, likelihood)
        values (:user_id, :event_id, :likelihood)
    """

    cur.execute(sql, user_id=user_id, event_id=event_id, likelihood=likelihood)
    con.commit()
    cur.close()

    return jsonify(result=True)

@event_api.route('/event/subscribed/<id>', methods=['GET'])
def get_rsvps(id):
    cur = get_cursor()

    sql = """SELECT * FROM RSVP WHERE user_id = :id"""

    cur.execute(sql, id=id)
    tuples = cur.fetchmany()

    cur.close()

    rsvps = [RSVP(*rsvp) for rsvp in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    if not tuples:
        return {"result": "User does not exist"}
    else:
        print(rsvps)
        return rsvp_schema.jsonify(rsvps, many=True)

@event_api.route('/event/clubevents/<user_id>', methods=['GET'])
def get_club_events(user_id):
    cur = get_cursor()

    sql = """
             SELECT e.event_id, e.club_id, TO_CHAR(e.event_start, 'HH:MI PM DY MON DD'), TO_CHAR(e.event_end, 'HH:MI PM DY MON DD'), e.event_description, e.img_url, c.club_name
             FROM appevent e
             JOIN membership m on m.club_id = e.club_id
             JOIN club c on c.club_id = e.club_id
             WHERE m.user_id = :user_id
        """
     
    cur.execute(sql, user_id=user_id)
    events = cur.fetchmany()

    cur.close()

    return event_schema.jsonify([Event(*event) for event in events], many=True)
