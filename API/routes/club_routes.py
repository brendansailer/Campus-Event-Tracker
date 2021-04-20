from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
import cx_Oracle

club_api = Blueprint('club_api', __name__)

@club_api.route('/club/create', methods=['POST'])
def create_account():
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
