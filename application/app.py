from flask import Flask, render_template


app = Flask(__name__, static_folder='../static/dist', template_folder='../static')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def catch_root_paths(path):
    return render_template('index.html')
