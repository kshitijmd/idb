from app.app import create_app

if __name__ == '__main__':
    create_app('config.json').run(host='0.0.0.0', port=80, threaded=True)
