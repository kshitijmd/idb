from flask import Blueprint, jsonify
# probably going to need to import from our models here

albums_blueprint = Blueprint('albums', __name__)

# Get a list of all albums


@albums_blueprint.route('/')
def get_albums():
    jsondata = []
    # Put the data into a python object

    return jsonify(jsondata)

# Get a specific album based on ID


@albums_blueprint.route('/<album_id>')
def get_album(album_id):
    jsondata = {}
    # Put the data into a python object

    return jsonify(jsondata)
