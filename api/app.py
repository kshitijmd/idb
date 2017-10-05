# Application entry point
# run with 'python app.py'
# visit localhost:8000/api/v1/artists

from flask import Flask
from resources.artists import artists_api

DEBUG = True
HOST = '0.0.0.0'
PORT = 8000

app = Flask(__name__)
app.register_blueprint(artists_api)

if __name__ == '__main__':
    app.run(debug=DEBUG, host=HOST, port=PORT)
