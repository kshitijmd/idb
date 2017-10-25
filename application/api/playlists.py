from flask import Blueprint
from database.models import Playlist
from api.util import serialize

playlists_blueprint = Blueprint('playlists', __name__)

# Get a list of all playlists


@playlists_blueprint.route('/')
def get_playlists():
    jsondata = []
    # Put the data into a python object

    return jsonify(jsondata)

# Get a specific playlist based on ID


@playlists_blueprint.route('/<playlist_id>')
def get_playlist(playlist_id):
    return serialize(Playlist.query.filter_by(id=playlist_id).first())
