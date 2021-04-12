from flask import Blueprint, request, jsonify
from database_helpers import get_cursor

login_api = Blueprint('login_api', __name__)

@login_api.route('/login', methods=['POST'])
def login():
    cur = get_cursor()

    # Get fields from the POST request
    password = request.json['password']
    email = request.json['email']

    sql = """
        SELECT user_id
        FROM appuser u
        WHERE u.email = :email and u.pass = :password
    """

    cur.execute(sql, email=email, password=password)

    user_id = cur.fetchone()[0] # Unpack the tuple returned by execute()
    cur.close()

    if user_id: # User exists
        return jsonify(result=True, user_id=user_id)
    else:
        return jsonify(result=False, user_id=0)

@login_api.route('/login/reset', methods=['POST'])
def reset_password():
    cur = get_cursor()

    new_password = request.json['new_password']
    old_password = request.json['old_password']
    user_id = request.json['user_id']

    sql = """
        SELECT *
        FROM appuser u
        WHERE u.user_id = :user_id and u.pass = :password
    """

    cur.execute(sql, user_id=user_id, password=old_password)

    user = cur.fetchone()

    if user: # The user has the right old password
        print("Resetting password")

        sql = """
            UPDATE appuser
            SET pass = :new_password
            WHERE user_id = :user_id
        """
        cur.execute(sql, user_id=user_id, new_password=new_password)

        cur.close()
        return jsonify(result=True)
    else:
        cur.close()
        return jsonify(result=False)

# TODO - figure out why this doesn't work
@login_api.route('/login/create', methods=['POST'])
def create_account():
    cur = get_cursor()

    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    sql = """
        INSERT INTO appuser(username, email, pass)
        values (:username, :email, :password)
    """

    cur.execute(sql, username=username, email=email, password=password)

    cur.close()

    return jsonify(result=True)
