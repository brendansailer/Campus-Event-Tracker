Instructions on how to run the API (Do this from the API directory):
- Upgrade pip: python3 -m pip install --user --upgrade pip
- Install virtualenv: python3 -m pip install --user virtualenv
- Create the venv: python3 -m venv env
- Activate the venv: source env/bin/activate
- Install requirements: pip install -r requirements.txt
- Exit: deactivate

Going forward, just activate the the venv (source env/bin/activate)
- Run the API: python3 app.py

To Test:
- Curl localhost:5000/endpoint OR use Postman if you setup the vscode ssh plugin properly

You also need to run this command to make the Oracle_cx library work (just add it to your bashrc and source it):
export LD_LIBRARY_PATH=$ORACLE_HOME/lib

Also make sure to have a database user with username project and password password:
- create user project identified by "password";
- grant all privileges to project identified by password;

Database Library Documentation:
https://oracle.github.io/python-cx_Oracle/samples/tutorial/Python-and-Oracle-Database-Scripting-for-the-Future.html#fetching

Notes:
- Schemas determine how an object is serialized (into JSON)
- Use models to assign names to the fields returned by the query (makes the Schema work)
- NO semi-colons in sql strings

Important:
- Do NOT run the API at the same time as sqlplus if you are doing an update/insert statement as sometimes the rows can be locked and then the query hangs
