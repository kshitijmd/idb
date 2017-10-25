from flask import Blueprint
from database.models import Track
from api.util import serialize

tracks_blueprint = Blueprint('tracks', __name__)

# Get a list of all tracks


@tracks_blueprint.route('/')
def get_tracks():
    jsondata = []
    # Put the data into a python object

    return jsonify(jsondata)

# Get a specific track based on ID


@tracks_blueprint.route('/<track_id>')
def get_track(track_id):
    return serialize(Track.query.filter_by(id=track_id).first())
