from flask import Blueprint, jsonify
# probably going to need to import from our models here

artists_blueprints = Blueprint(
	'artists', __name__
)

# Get a list of all artists
@artists_blueprints.route('/artists')
def get_artists():
	jsondata = []
	# Put the data into a python object
	
	return jsonify(jsondata)

# Get a specific artist based on ID
@artists_blueprints.route('/artists/<id>')
def get_artist(id):
	jsondata = {}
	# Put the data into a python object

	return jsonify(jsondata)

