from flask import Blueprint, request, jsonify
from database_helpers import get_cursor

club_api = Blueprint('club_api', __name__)

# TODO - figure out why this doesn't work
@club_api.route('/club/create', methods=['POST'])
def create_account():
    cur = get_cursor()

    club_name = request.json['club_name']
    club_description = request.json['club_description']

    sql = """
        INSERT INTO club(club_name, club_description)
        values (:club_name, :club_description)
    """

    cur.execute(sql, club_name=club_name, club_description=club_description)

    cur.close()

    return jsonify(result=True)
