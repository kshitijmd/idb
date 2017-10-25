from flask import Blueprint, jsonify
# probably going to need to import from our models here

tracks_blueprints = Blueprint(
	'tracks', __name__
)

# Get a list of all tracks
@tracks_blueprints.route('/tracks')
def get_tracks():
	jsondata = []
	# Put the data into a python object
	
	return jsonify(jsondata)

# Get a specific track based on ID
@tracks_blueprints.route('/tracks/<id>')
def get_track(id):
	jsondata = {}
	# Put the data into a python object

	return jsonify(jsondata)

