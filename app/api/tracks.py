from flask import Blueprint, jsonify, request
from app.models import Track
from .util import serialize, all_response

tracks_blueprint = Blueprint('tracks', __name__)

# Get a list of all tracks


@tracks_blueprint.route('/')
def get_tracks():
    return all_response(Track, 'tracks')

# Get a specific track based on ID


@tracks_blueprint.route('/<track_id>')
def get_track(track_id):
    return jsonify(serialize(Track.query.filter_by(id=track_id).first()))
