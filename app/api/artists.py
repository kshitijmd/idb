from flask import Blueprint, jsonify
from app.models import Artist
from .util import serialize

# probably going to need to import from our models here

artists_blueprint = Blueprint('artists', __name__)

# Get a list of all artists


@artists_blueprint.route('/')
def get_artists():
    return jsonify([serialize(artist) for artist in Artist.query.limit(50).all()])

# Get a specific artist based on ID


@artists_blueprint.route('/<artist_id>')
def get_artist(artist_id):
    return jsonify(serialize(Artist.query.filter(Artist.id == artist_id).first()))
