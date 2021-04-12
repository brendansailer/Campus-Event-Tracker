from flask import Blueprint
from database_helpers import get_cursor

main_api = Blueprint('main_api', __name__)

# Check if the API is alive
@main_api.route('/test', methods=['GET'])
def test():
    cur = get_cursor()

    cur.execute("SELECT 'Hello, World from Oracle DB!' FROM DUAL")

    col = cur.fetchone()[0]
    cur.close()

    return {"field": col}
