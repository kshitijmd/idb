from flask import Blueprint, jsonify
from flask_restful import Resource, Api

class ArtistList(Resource):
    def get(self):
        return jsonify({'artists': 'names'})


class Artist(Resource):
    def get(self, id):
        return jsonify({'name': 'Will Smith'})

artists_api = Blueprint('resources.artists', __name__)
api = Api(artists_api)
api.add_resource(
    ArtistList,
    '/api/v1/artists',
    endpoint='artists'
)
api.add_resource(
    Artist,
    '/api/v1/artist/<int:id>',
    endpoint='artist'
)
