# Application entry point
# run with 'python app.py'
# visit localhost:8000/api/v1/artists

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from resources.artists import artists_api

DEBUG = True
HOST = '0.0.0.0'
PORT = 8000

app = Flask(__name__)
app.config.from_json(os.path.join(os.getcwd(), 'config.json'))
db = SQLAlchemy(app)

app.register_blueprint(artists_api)
