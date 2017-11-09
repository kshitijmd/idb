import datetime

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pylast
from app.gcloudutils.bucket import upload_to_cloud
from app.models import db, Track, Artist, Album, Playlist, Genre
from get_data import walk_playlist, create_genres

from app.app import create_app
app = create_app()
app.app_context().push()

# from application.lib.sqlalchemy.exc import IntegrityError
# from application.lib.psycopg2 import IntegrityError

# API Credentials go here


def add_playlist_images():
    playlists = db.session.query(Playlist).all()
    for pl in playlists:
        if pl.image_url:
            continue
        print('fixing %s' % pl.name)
        sp_pl = sp.user_playlist('spotifycharts', pl.spotify_uri)
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


def get_release_dates():
    albums = db.session.query(Album).all()
    for a in albums:
        print('album: %s' % a.name)
        sp_alb = sp.album(a.spotify_uri)
        date = sp_alb['release_date']
        precision = sp_alb['release_date_precision']
        if precision == 'year':
            y = int(date)
            m = 1
            d = 1
        elif precision == 'month':
            y, m = map(lambda x: int(x), date.split('-'))
            d = 1
        else:
            y, m, d = map(lambda x: int(x), date.split('-'))
        a.releasedate = datetime.date(y, m, d)
        db.session.commit()

def get_popularity():
    #Get popularity for each track, artist, and album
    print("Getting TRACK popularity")
    tracks = db.session.query(Track).all()
    for t in tracks:
        if t.popularity != 0:
            continue
        sp_track = sp.track(t.spotify_uri)
        t.popularity = sp_track["popularity"]
        print(t.name + "\t" + str(t.popularity))
        db.session.commit()

    print("Getting ARTIST popularity")
    artists = db.session.query(Artist).all()
    for a in artists:
        if a.popularity != 0:
            continue
        sp_artist = sp.artist(a.spotify_uri)
        a.popularity = sp_artist["popularity"]
        print(a.name + "\t" + str(a.popularity))
        db.session.commit()

    print("Getting ALBUM popularity")
    albums = db.session.query(Album).all()
    for a in albums:
        if a.popularity != 0:
            continue
        sp_album = sp.album(a.spotify_uri)
        a.popularity = sp_album["popularity"]
        print(a.name + "\t" + str(a.popularity))
        db.session.commit()

def calculate_playlist_popularity():
    #The popularity of a playist is the average popularity of it's tracks
    playlists = db.session.query(Playlist).all()
    for p in playlists:
        if p.popularity != 0:
            continue
        total = 0
        count = 0
        for t in p.tracks:
            total += t.popularity
            count += 1
        if count:
            p.popularity = total/count
        else:
            p.popularity = 0
        print(p.name + "\t" + str(p.popularity))
        db.session.commit()

def import_playlist():
    playlist_id = "37i9dQZEVXbLRQDuF5jeBp"
    sp_playlist = sp.user_playlist('spotifycharts', playlist_id=playlist_id)
    walk_playlist(sp_playlist)

def patch_genres():
    #Marvin Gaye spotify:artist:3koiLjNrgRTNbOwViDipeA
    sp_artist = sp.artist("spotify:artist:3koiLjNrgRTNbOwViDipeA")
    create_genres(sp_artist['genres'])

    # Genres already exist in DB by this point
    artist = db.session.query(Artist).filter_by(id=9).first()
    for g in sp_artist['genres']:
        # Get genre db obj
        genre = db.session.query(Genre).filter_by(name=g).first()
        if genre not in artist.genres:
            artist.genres.append(genre)
            db.session.commit()

    #Turns out Spotify API doesn't return anything for album genre
    #So we're done



if __name__ == '__main__':
    # add_playlist_images()
    # remove_anchor_tags()
    # get_release_dates()
    # get_popularity()
    # calculate_playlist_popularity()
    # import_playlist()
    patch_genres()
