import math
from functools import reduce
from flask import Blueprint, jsonify, request
from app.models import Album, Artist, Track, Playlist
from .util import serialize, all_response


search_blueprint = Blueprint('search', __name__)


@search_blueprint.route('/')
def search():
    page = int(request.args.get('page')) if request.args.get('page') else 1
    per_page = int(request.args.get(
        'per_page')) if request.args.get('per_page') else 10
    query_term = request.args.get('query')

    # TODO: use LIMIT and OFFSET to not retrieve every match every time
    albums = Album.query.search(query_term).all()
    artists = Artist.query.search(query_term).all()
    tracks = Track.query.search(query_term).all()
    playlists = Playlist.query.search(query_term).all()

    results = [albums, artists, tracks, playlists]

    total = reduce(lambda x, y: x + len(y), results, 0)
    pages = max(map(lambda r: math.ceil(len(r) / per_page), results))
    offset = (page - 1) * per_page

    # results = list(map(lambda r: paginate(r, offset, per_page), results))

    albums = paginate(albums, offset, per_page)
    artists = paginate(artists, offset, per_page)
    tracks = paginate(tracks, offset, per_page)
    playlists = paginate(playlists, offset, per_page)

    prev_num = page - 1 if page > 1 else None
    next_num = page + 1 if page + 1 <= pages else None

    return jsonify({
        "albums": [serialize(album) for album in albums],
        "artists": [serialize(artist) for artist in artists],
        "tracks": [serialize(track) for track in tracks],
        "playlists": [serialize(playlist) for playlist in playlists],
        "page": page,
        "per_page": per_page,
        "pages": pages,
        "next": next_num,
        "prev": prev_num
    })


def paginate(results, offset, per_page):
    results_paginated = []
    if len(results) > offset:
        end = offset + per_page if offset + \
            per_page <= len(results) else len(results)
        results_paginated = results[offset:end]
    return results_paginated
