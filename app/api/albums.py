from flask import Blueprint, jsonify, request
from app.models import Album
from .util import serialize, all_response

albums_blueprint = Blueprint('albums', __name__)

# Get a list of all albums


@albums_blueprint.route('/')
def get_albums():
    return all_response(Album, 'albums')

# Get a specific album based on ID


@albums_blueprint.route('/<album_id>')
def get_album(album_id):
    return jsonify(serialize(Album.query.filter(Album.id == album_id).first()))
