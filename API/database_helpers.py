import os
import cx_Oracle

db_user = os.environ.get('DBAAS_USER_NAME', 'project')
db_password = os.environ.get('DBAAS_USER_PASSWORD', 'password')
db_connect = os.environ.get('DBAAS_DEFAULT_CONNECT_DESCRIPTOR', "localhost:1521/XE")
pool = cx_Oracle.SessionPool(db_user, db_password, db_connect, min=1, max=20, increment=1, encoding="UTF-8")

def get_connection():
    con = pool.acquire()
    return con, con.cursor()

def close(connection, cursor):
    cursor.close()
    pool.release(connection)
