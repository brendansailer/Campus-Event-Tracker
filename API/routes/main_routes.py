from flask import Blueprint
from database_helpers import get_connection, close

main_api = Blueprint('main_api', __name__)

# Check if the API is alive
@main_api.route('/test', methods=['GET'])
def test():
    con, cur = get_connection()

    cur.execute("SELECT 'Hello, World from Oracle DB!' FROM DUAL")

    col = cur.fetchone()[0]
    close(con, cur)

    return {"field": col}
