from flask import Blueprint
from API.database_helpers import get_cursor

main_api = Blueprint('main_api', __name__)

@main_api.route('/main')
def main():
    return {"result": "success"}

@main_api.route('/test')
def test():
    cur = get_cursor()

    cur.execute("SELECT 'Hello, World from Oracle DB!' FROM DUAL")

    col = cur.fetchone()[0]
    cur.close()

    return {"field": col}
