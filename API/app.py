import os
from flask import Flask
from routes.main_routes import main_api
from routes.login_routes import login_api

app = Flask(__name__)

# TODO - Add more Blueprints below (This allows us to have routes in many different files)
app.register_blueprint(main_api)
app.register_blueprint(login_api)

if __name__ == '__main__':
    service_port = port=os.environ.get('PORT', '5000')
    app.run(host='0.0.0.0', port= int(service_port) )
