# Application entry point
# run with 'python app.py'
# visit localhost:8000/api/v1/artists

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_json('config.json')
db = SQLAlchemy(app)

# these are down here to avoid circular import problems
from .api.artists import artists_blueprint
from .api.albums import albums_blueprint
from .api.playlists import playlists_blueprint
from .api.tracks import tracks_blueprint

app.register_blueprint(artists_blueprint, url_prefix='/artists')
app.register_blueprint(albums_blueprint, url_prefix='/albums')
app.register_blueprint(playlists_blueprint, url_prefix='/playlists')
app.register_blueprint(tracks_blueprint, url_prefix='/tracks')
