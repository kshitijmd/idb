# Application entry point
# run with 'python app.py'
# visit localhost:8000/api/v1/artists

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from api.artists import artists_blueprint
from api.albums import albums_blueprint
from api.playlists import playlists_blueprint
from api.tracks import tracks_blueprint

DEBUG = True
HOST = '0.0.0.0'
PORT = 8000

app = Flask(__name__)
app.config.from_json(os.path.join(os.getcwd(), 'config.json'))
db = SQLAlchemy(app)

app.register_blueprint(artists_blueprint, url_prefix='/artists')
app.register_blueprint(albums_blueprint, url_prefix='/albums')
app.register_blueprint(playlists_blueprint, url_prefix='/playlists')
app.register_blueprint(playlists_tracks, url_prefix='/tracks')
