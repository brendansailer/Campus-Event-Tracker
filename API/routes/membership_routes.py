from flask import Blueprint, request, jsonify
from database_helpers import get_cursor, get_connection
from schemas.membership_schema import membership_schema
from models.membership_model import Membership  

membership_api = Blueprint('membership_api', __name__)

@membership_api.route('/membership/<user_id>', methods=['GET'])
def get_subscriptions(user_id):
    cur = get_cursor()

    sql = """SELECT m.club_id, c.club_name, c.club_description
            FROM membership m
            JOIN club c
                ON m.club_id = c.club_id
            WHERE m.user_id = :user_id
        """

    cur.execute(sql, user_id=user_id)
    tuples = cur.fetchmany()

    cur.close()

    members = [Membership(*member) for member in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return membership_schema.jsonify({"subscriptions": members})

@membership_api.route('/membership/create', methods=['POST'])
def create_subscription():
    con = get_connection()
    cur = get_cursor()

    user_id = request.json['user_id']
    club_id = request.json['club_id']
    rank = request.json['rank']

    sql = """
        INSERT INTO membership (user_id, club_id, rank)
        values (:user_id, :club_id, :rank)
    """

    try:
        cur.execute(sql, user_id=user_id, club_id=club_id, rank=rank)
    except:
        con.commit()
        cur.close()
        return jsonify(result=False)

    con.commit()
    cur.close()

    return jsonify(result=True)

@membership_api.route('/membership/delete', methods=['POST'])
def delete_subscription():
    con = get_connection()
    cur = get_cursor()

    user_id = request.json['user_id']
    club_id = request.json['club_id']

    sql = """
        DELETE FROM membership 
        WHERE user_id = :user_id AND club_id = :club_id
    """

    try:
        cur.execute(sql, user_id=user_id, club_id=club_id)
    except:
        con.commit()
        cur.close()
        return jsonify(result=False)

    con.commit()
    cur.close()

    return jsonify(result=True)

@membership_api.route('/membership/deleteBatch', methods=['POST'])
def delete_subscriptions():
    con = get_connection()
    cur = get_cursor()

    user_id = request.json['user_id']
    club_ids = request.json['club_ids']

    for club_id in club_ids:
        sql = """
            DELETE FROM membership 
            WHERE user_id = :user_id AND club_id = :club_id
        """

        try:
            cur.execute(sql, user_id=user_id, club_id=club_id)
        except:
            con.commit()
            cur.close()
            return jsonify(result=False)

    con.commit()
    cur.close()

    return jsonify(result=True)
