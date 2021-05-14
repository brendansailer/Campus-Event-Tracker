from flask import Blueprint, request, jsonify
from database_helpers import get_connection, close
from schemas.event_schema import event_schema
from models.event_model import Event  
from schemas.rsvp_schema import rsvp_schema
from models.rsvp_model import RSVP

event_api = Blueprint('event_api', __name__)

@event_api.route('/event', methods=['GET'])
def get_events():
    con, cur = get_connection()

    sql = """
            SELECT e.event_id, e.club_id, e.event_start, e.event_end, e.event_description, e.img_url, c.club_name, e.location
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
          """

    cur.execute(sql)
    tuples = cur.fetchmany()

    close(con, cur)

    events = [Event(*event) for event in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return event_schema.jsonify(events, many=True) # Create an array of these events

@event_api.route('/event/<id>', methods=['GET'])
def get_event(id):
    con, cur = get_connection()

    sql = """
            SELECT e.event_id, e.club_id, e.event_start, e.event_end, e.event_description, e.img_url, c.club_name, e.location
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
            WHERE event_id = :id
        """

    cur.execute(sql, id=id)
    event = cur.fetchone()

    close(con, cur)

    if not event:
        return {"result": "Event does not exist"}
    else:
        return event_schema.jsonify(Event(*event))

@event_api.route('/event/random', methods=['GET'])
def get_event_random():
    con, cur = get_connection()

    sql = """
            SELECT * FROM
            (SELECT e.event_id, e.club_id, e.event_start, e.event_end, e.event_description, e.img_url, c.club_name, e.location
            FROM appevent e
            JOIN club c on c.club_id = e.club_id
            ORDER BY dbms_random.value)
            WHERE ROWNUM <= 3
        """
     
    cur.execute(sql)
    events = cur.fetchmany()

    close(con, cur)

    return event_schema.jsonify([Event(*event) for event in events], many=True)

@event_api.route('/event/rsvp', methods=['POST'])
def rsvp():
    con, cur = get_connection()

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
    close(con, cur)

    return jsonify(result=True)

@event_api.route('/event/subscribed/<id>', methods=['GET'])
def get_rsvps(id):
    con, cur = get_connection()

    sql = """SELECT * FROM RSVP WHERE user_id = :id"""

    cur.execute(sql, id=id)
    tuples = cur.fetchmany()

    close(con, cur)

    rsvps = [RSVP(*rsvp) for rsvp in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    if not tuples:
        return {"result": "User does not exist"}
    else:
        print(rsvps)
        return rsvp_schema.jsonify(rsvps, many=True)

@event_api.route('/event/delete/<id>', methods=['DELETE'])
def delete_event(id):
    con = get_connection()
    cur = get_cursor()

    sql = """
          DELETE FROM appevent
          WHERE event_id = :id
    """

    cur.execute(sql, id=id)
    con.commit()
    cur.close()

    return jsonify(result=True)
    
@event_api.route('/event/clubevents/<user_id>', methods=['GET'])
def get_club_events(user_id):
    con, cur = get_connection()

    sql = """
             SELECT e.event_id, e.club_id, e.event_start, e.event_end, e.event_description, e.img_url, c.club_name, e.location
             FROM appevent e
             JOIN membership m on m.club_id = e.club_id
             JOIN club c on c.club_id = e.club_id
             WHERE m.user_id = :user_id
        """
     
    cur.execute(sql, user_id=user_id)
    events = cur.fetchmany()

    close(con, cur)

    return event_schema.jsonify([Event(*event) for event in events], many=True)
