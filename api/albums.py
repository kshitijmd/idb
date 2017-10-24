from flask import Blueprint, jsonify
# probably going to need to import from our models here

albums_blueprints = Blueprint(
	'albums', __name__
)

# Get a list of all albums
@albums_blueprints.route('/albums')
def get_albums():
	jsondata = []
	# Put the data into a python object
	
	return jsonify(jsondata)

# Get a specific album based on ID
@albums_blueprints.route('/albums/<id>')
def get_album(id):
	jsondata = {}
	# Put the data into a python object

	return jsonify(jsondata)

