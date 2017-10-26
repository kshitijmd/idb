from flask import Blueprint, jsonify
from database.models import Track
from api.util import serialize

tracks_blueprint = Blueprint('tracks', __name__)

# Get a list of all tracks


@tracks_blueprint.route('/')
def get_tracks():
    return jsonify([serialize(track) for track in Track.query.all()])

# Get a specific track based on ID


@tracks_blueprint.route('/<track_id>')
def get_track(track_id):
    return jsonify(serialize(Track.query.filter_by(id=track_id).first()))
