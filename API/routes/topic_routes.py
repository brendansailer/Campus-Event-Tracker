from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
from schemas.topic_schema import topic_schema, individual_topic_schema
from models.topic_model import Topic  

topic_api = Blueprint('topic_api', __name__)

@topic_api.route('/clubTopic', methods=['GET'])
def get_topics():
    cur = get_cursor()

    sql = """SELECT * FROM topic"""

    cur.execute(sql)
    tuples = cur.fetchmany()

    cur.close()
    print(tuples)

    topics = [Topic(*topic) for topic in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return topic_schema.jsonify({"topics": topics})

@topic_api.route('/clubTopic/create', methods=['POST'])
def create_topic():
    con = get_connection()
    cur = get_cursor()

    description = request.json['description']

    sql = """
        INSERT INTO topic(topic_description)
        values (:description)
    """

    cur.execute(sql, description=description)
    con.commit()
    cur.close()

    return jsonify(result=True)

@topic_api.route('/clubTopic/<club>', methods=['GET'])
def get_topic_from_club(club):
    con = get_connection()
    cur = get_cursor()

    sql = """
        SELECT topic.topic_id, topic.topic_description
        FROM topic, club_tag
        WHERE topic.topic_id = club_tag.club_id AND club_tag.club_id = :club
    """

    cur.execute(sql, club=club)
    topics = cur.fetchmany()

    cur.close()

    return individual_topic_schema.jsonify([Topic(*topic) for topic in topics])