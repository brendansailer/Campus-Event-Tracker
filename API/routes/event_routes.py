from flask import Blueprint, request, jsonify
from database_helpers import get_cursor
from schemas.event_schema import event_schema
from models.event_model import Event  

event_api = Blueprint('event_api', __name__)

@event_api.route('/event', methods=['GET'])
def events():
    cur = get_cursor()

    sql = """SELECT * FROM appevent"""

    cur.execute(sql)
    tuples = cur.fetchmany()

    cur.close()

    events = [Event(*event) for event in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return event_schema.jsonify(events)
