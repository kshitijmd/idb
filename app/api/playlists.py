from flask import Blueprint, jsonify
from app.models import Playlist
from .util import serialize

playlists_blueprint = Blueprint('playlists', __name__)

# Get a list of all playlists


@playlists_blueprint.route('/')
def get_playlists():
    return jsonify([serialize(playlist) for playlist in Playlist.query.limit(50).all()])

# Get a specific playlist based on ID


@playlists_blueprint.route('/<playlist_id>')
def get_playlist(playlist_id):
    return jsonify(serialize(Playlist.query.filter_by(id=playlist_id).first()))
