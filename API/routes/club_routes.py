from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection

club_api = Blueprint('club_api', __name__)

@club_api.route('/club/create', methods=['POST'])
def create_account():
    con = get_connection()
    cur = get_cursor()

    club_name = request.json['club_name']
    club_description = request.json['club_description']

    sql = """
        INSERT INTO club(club_name, club_description)
        values (:club_name, :club_description)
    """

    cur.execute(sql, club_name=club_name, club_description=club_description)
    con.commit()
    cur.close()

    return jsonify(result=True)
