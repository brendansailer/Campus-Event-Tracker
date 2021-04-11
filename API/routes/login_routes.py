from flask import Blueprint
from database_helpers import get_cursor

login_api = Blueprint('login_api', __name__)

@login_api.route('/login', methods=['GET'])
def test():
    cur = get_cursor()

    cur.execute("SELECT 'Hello, World from Oracle DB!' FROM DUAL")

    col = cur.fetchone()[0]
    cur.close()

    return {"field": col}
