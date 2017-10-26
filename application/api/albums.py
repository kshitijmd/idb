from flask import Blueprint, jsonify
from application.models import Album
from .util import serialize

albums_blueprint = Blueprint('albums', __name__)

# Get a list of all albums


@albums_blueprint.route('/')
def get_albums():
    return jsonify([serialize(album) for album in Album.query.all()])

# Get a specific album based on ID


@albums_blueprint.route('/<album_id>')
def get_album(album_id):
    return jsonify(serialize(Album.query.filter(Album.id == album_id).first()))
