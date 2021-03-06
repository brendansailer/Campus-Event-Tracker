from flask import Blueprint, request, jsonify
from database_helpers import get_connection, close
from schemas.membership_schema import membership_schema
from schemas.membership_schema import individual_membership_schema
from models.membership_model import Membership
from models.member_model import Member

membership_api = Blueprint('membership_api', __name__)

@membership_api.route('/membership/<user_id>', methods=['GET'])
def get_subscriptions(user_id):
    con, cur = get_connection()

    sql = """SELECT m.club_id, c.club_name, c.club_description, m.rank
            FROM membership m
            JOIN club c
                ON m.club_id = c.club_id
            WHERE m.user_id = :user_id
        """

    cur.execute(sql, user_id=user_id)
    tuples = cur.fetchmany()

    close(con, cur)

    members = [Membership(*member) for member in tuples] # Take the tuples and create Event models which can be serialized by the Event schema

    return membership_schema.jsonify({"subscriptions": members})

@membership_api.route('/club/members/<club_id>', methods=['GET'])
def get_club_members(club_id):
    con, cur = get_connection()

    sql = """
        SELECT membership.user_id, appuser.username, membership.rank
        FROM membership, appuser
        WHERE membership.club_id = :id AND appuser.user_id = membership.user_id
    """

    cur.execute(sql, id=club_id)
    tuples = cur.fetchmany() # TODO - update query to only return current events

    cur.close()

    return individual_membership_schema.jsonify([Member(*member) for member in tuples])

@membership_api.route('/membership/create', methods=['POST'])
def create_subscription():
    con, cur = get_connection()

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
        close(con, cur)
        return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@membership_api.route('/membership/crtadmin', methods=['POST'])
def create_admin():
    con, cur = get_connection()

    user_id = request.json['user_id']
    club_id = request.json['club_id']

    sql = """
        UPDATE membership 
        SET rank = 1
        WHERE user_id = :user_id AND club_id = :club_id
    """

    try:
        cur.execute(sql, user_id=user_id, club_id=club_id)
    except:
        con.commit()
        close(con, cur)
        return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@membership_api.route('/membership/demoteadmin', methods=['DELETE'])
def demote_admin():
    con, cur = get_connection()

    user_id = request.json['user_id']
    club_id = request.json['club_id']

    sql = """
        UPDATE membership 
        SET rank = 0
        WHERE user_id = :user_id AND club_id = :club_id
    """

    try:
        cur.execute(sql, user_id=user_id, club_id=club_id)
    except:
        con.commit()
        close(con, cur)
        return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@membership_api.route('/membership/delete', methods=['POST'])
def delete_subscription():
    con, cur = get_connection()

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
        close(con, cur)
        return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)

@membership_api.route('/membership/deleteBatch', methods=['POST'])
def delete_subscriptions():
    con, cur = get_connection()

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
            close(con, cur)
            return jsonify(result=False)

    con.commit()
    close(con, cur)

    return jsonify(result=True)
