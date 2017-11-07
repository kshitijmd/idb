import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pylast
from application.gcloudutils.bucket import upload_to_cloud
from application.models import db, Track, Artist, Album, Playlist, Genre

from application.app import create_app
app = create_app()
app.app_context().push()

# from application.lib.sqlalchemy.exc import IntegrityError
# from application.lib.psycopg2 import IntegrityError

# API Credentials go here


def add_playlist_images():
    playlists = db.session.query(Playlist).all()
    for pl in playlists:
        print('fixing %s' % pl.name)
        sp_pl = sp.user_playlist('spotify', pl.spotify_uri)
        image_url = upload_to_cloud(sp_pl['images'][0]['url'])
        pl.image_url = image_url
        db.session.commit()


def remove_anchor_tags():
    artists = db.session.query(Artist).all()
    for a in artists:
        print('fixing %s' % a.name)
        bio = a.bio
        idx = bio.find('<a href')
        bio = bio[:idx].strip().replace('\n', '')
        a.bio = bio
        db.session.commit()


if __name__ == '__main__':
    add_playlist_images()
    remove_anchor_tags()
