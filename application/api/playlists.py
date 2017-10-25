from flask import Blueprint, jsonify
# probably going to need to import from our models here

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
    jsondata = {}
    # Put the data into a python object

    return jsonify(jsondata)
