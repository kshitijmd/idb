from flask import Blueprint, jsonify
# probably going to need to import from our models here

playlists_blueprints = Blueprint(
	'playlists', __name__
)

# Get a list of all playlists
@playlists_blueprints.route('/playlists')
def get_playlists():
	jsondata = []
	# Put the data into a python object
	
	return jsonify(jsondata)

# Get a specific playlist based on ID
@playlists_blueprints.route('/playlists/<id>')
def get_playlist(id):
	jsondata = {}
	# Put the data into a python object

	return jsonify(jsondata)

