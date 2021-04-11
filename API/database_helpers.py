import os
import cx_Oracle

db_user = os.environ.get('DBAAS_USER_NAME', 'hr')
db_password = os.environ.get('DBAAS_USER_PASSWORD', 'hr')
db_connect = os.environ.get('DBAAS_DEFAULT_CONNECT_DESCRIPTOR', "localhost:1521/XE")
connection = cx_Oracle.connect(db_user, db_password, db_connect)

def get_cursor():
    return connection.cursor()
