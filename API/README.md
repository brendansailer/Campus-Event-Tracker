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
- Curl localhost:5000/endpoint

You also need to run this command to make the Oracle_cx library work (just add it to your bashrc and source it):
export LD_LIBRARY_PATH=$ORACLE_HOME/lib

