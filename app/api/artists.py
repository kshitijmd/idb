from flask import Blueprint, jsonify, request
from app.models import Artist
from .util import serialize, all_response

# probably going to need to import from our models here

artists_blueprint = Blueprint('artists', __name__)

# Get a list of all artists


@artists_blueprint.route('/')
def get_artists():
    return all_response(Artist, 'artists')

# Get a specific artist based on ID


@artists_blueprint.route('/<artist_id>')
def get_artist(artist_id):
    return jsonify(serialize(Artist.query.filter(Artist.id == artist_id).first()))
