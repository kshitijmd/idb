from flask import Blueprint, jsonify, request
from app.models import Album, Artist, Track, Playlist
from .util import serialize, all_response

search_blueprint = Blueprint('search', __name__)


@search_blueprint.route('/')
def search():
    query_term = request.args.get('query')
    albums = Album.query.search(query_term).all()
    artists = Artist.query.search(query_term).all()
    tracks = Track.query.search(query_term).all()
    playlists = Playlist.query.search(query_term).all()
    return jsonify({
        "albums": [serialize(album) for album in albums],
        "artists": [serialize(artist) for artist in artists],
        "tracks": [serialize(track) for track in tracks],
        "playlists": [serialize(playlist) for playlist in playlists]
    })
