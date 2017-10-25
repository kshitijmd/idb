from flask import Blueprint
from database.models import Artist
from api.util import serialize

# probably going to need to import from our models here

artists_blueprint = Blueprint('artists', __name__)

# Get a list of all artists


@artists_blueprint.route('/')
def get_artists():
    jsondata = []
    # Put the data into a python object

    return jsonify(jsondata)

# Get a specific artist based on ID


@artists_blueprint.route('/<artist_id>')
def get_artist(artist_id):
    return serialize(Artist.query.filter(Artist.id == artist_id).first())
