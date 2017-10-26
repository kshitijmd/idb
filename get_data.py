import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pylast
from application.gcloudutils.bucket import upload_to_clooouuddd

from application.models import db, Track, Artist, Album, Playlist, Genre

from application.app import create_app
app = create_app()
app.app_context().push()

# from application.lib.sqlalchemy.exc import IntegrityError
# from application.lib.psycopg2 import IntegrityError

# API Credentials go here



def walk_playlist():
    # Just walk the first page of playlists for now (can paginate later for more data)
    sp_playlists = sp.featured_playlists()['playlists']['items']
    for i, sp_playlist in enumerate(sp_playlists):
        while(confirm(" playlist")):
            print('Playlist: {}/{}'.format(i+1, len(sp_playlists)))

            # get the full playlist object
            sp_full = sp.user_playlist(
                'spotify', sp_playlist['id'], fields='tracks, followers')
            playlist = {
                'name': sp_playlist['name'],
                'spotify_uri': sp_playlist['uri'],
                'num_tracks': sp_playlist['tracks']['total'],
                'num_followers': sp_full['followers']['total'],
            }

            # walk the tracks on the playlist, to get back aggregate data
            playlist_attrs = walk_playlist_tracks(sp_full['tracks'])
            playlist.update(playlist_attrs)

            # create the db playlist obj
            create_playlist(playlist)

            success = False
            while not success:
                try:
                    db.session.commit()
                except BaseException as e:
                    print("playlist commit failed\n"+str(e))
                    db.session.rollback()
                else:
                    success = True
    


def walk_playlist_tracks(sp_tracks):
    attrs = {
        'duration': 0,
        'num_artists': 0,
        'artists': set(),
        'tracks': []
    }

    # paginate all tracks in playlist
    while sp_tracks:
        for i, sp_track in enumerate(sp_tracks['items']):
            print('PTrack: {}/{}'.format(i+1, len(sp_tracks['items'])))

            sp_track = sp_track['track']

            if db.session.query(Track).filter_by(spotify_uri=sp_track['spotify_uri']).first() is not None:
                continue #Skip this track, already covered.

            attrs['duration'] += sp_track['duration_ms']

            # create db artist obj from artist ID
            artist = create_artist(sp_track['artists'][0])
            attrs['artists'].add(artist)

            # create db album obj, also get this db track obj
            # from spotify track obj and db artist obj
            album, track = create_album(sp_track, artist)

            attrs['tracks'].append(track)

        sp_tracks = sp.next(sp_tracks) if sp_tracks['next'] else None

    attrs['num_artists'] = len(attrs['artists'])
    return attrs


def create_artist(sp_artist):
    """Creates a db artist obj from a spotify artist obj"""
    sp_artist = sp.artist(sp_artist['id'])
    name = sp_artist['name']
    image_url = upload_to_clooouuddd(sp_artist['images'][0]['url'])
    spotify_uri = sp_artist['uri']
    lfm_artist = plast.get_artist(name)
    bio = lfm_artist.get_bio_summary()
    playcount = lfm_artist.get_playcount()

    genres = create_genres(sp_artist['genres'])

    artist = Artist(
        name=name,
        image_url=image_url,
        spotify_uri=spotify_uri,
        bio=bio,
        playcount=playcount)

    #Genres already exist in DB by this point
    for g in sp_artist['genres']:
        #Get genre db obj
        genre = db.session.query(Genre).filter_by(name=g).first()
        artist.genres.append(genre)

    if db.session.query(Artist).filter_by(spotify_uri=artist.spotify_uri).first() is None:
        db.session.add(artist)

    success = False
    while not success:
        try:
            db.session.commit()
        except BaseException as e:
            print("artist commit failed\n"+str(e))
            db.session.rollback()
        else:
            success = True

    return artist


def create_album(sp_track, artist):
    sp_album = sp.album(sp_track['album']['id'])
    name = sp_album['name']
    spotify_uri = sp_album['uri']
    image_url = upload_to_clooouuddd(sp_album['images'][0]['url'])
    lfm_album = plast.get_album(artist.name, name)
    playcount = lfm_album.get_playcount()
    releasedate = lfm_album.get_release_date()

    genres = create_genres(sp_album['genres'])

    album = Album(
        name=name,
        spotify_uri=spotify_uri,
        image_url=image_url,
        playcount=playcount,
        releasedate=releasedate,
        artist=artist)

    #Genres already exist in DB by this point
    for g in sp_album['genres']:
        #Get genre db obj
        genre = db.session.query(Genre).filter_by(name=g).first()
        album.genres.append(genre)

    if db.session.query(Album).filter_by(spotify_uri=album.spotify_uri).first() is None:
        db.session.add(album)

    success = False
    while not success:
        try:
            db.session.commit()
        except BaseException as e:
            print("album commit failed\n"+str(e))
            db.session.rollback()
        else:
            success = True

    playlist_track = create_track(sp_track, artist, album)
    sp_tracks = sp_album['tracks']
    walk_tracks(sp_tracks, artist, album)

    return album, playlist_track


def walk_tracks(sp_tracks, artist, album):
    while sp_tracks:
        for i, sp_track in enumerate(sp_tracks['items']):
            print('ATrack: {}/{}'.format(i+1, len(sp_tracks['items'])))
            create_track(sp.track(sp_track['id']), artist, album)
        sp_tracks = sp.next(sp_tracks) if sp_tracks['next'] else None


def create_track(sp_track, artist, album):
    name = sp_track['name']
    playcount = plast.get_track(artist.name, name).get_playcount()
    duration = sp_track['duration_ms']
    spotify_uri = sp_track['uri']
    image_url = upload_to_clooouuddd(sp_track['album']['images'][0]['url'])

    track = Track(
        name=name,
        playcount=playcount,
        duration=duration,
        spotify_uri=spotify_uri,
        image_url=image_url,
        album=album,
        artist=artist)

    if db.session.query(Track).filter_by(spotify_uri=track.spotify_uri).first() is None:
        db.session.add(track)

    success = False
    while not success:
        try:
            db.session.commit()
        except BaseException as e:
            print(" track commit failed\n"+str(e))
            db.session.rollback()
        else:
            success = True

    return track


def create_playlist(playlist_attrs):
    playlist = Playlist(**playlist_attrs)
    if db.session.query(Playlist).filter_by(spotify_uri=playlist.spotify_uri).first() is None:
        db.session.add(playlist)
    return playlist


def create_genres(genres):
    genres = [Genre(name=g) for g in genres]
    for g in genres:
        try:
            # db.session.begin(nested=True)
            if db.session.query(Genre).filter_by(name=g.name).first() is None:
                db.session.add(g)
                db.session.commit()
            # else:
                # print("genre already in db")
            
        except BaseException as ie:
            print("skipped")
            raise ie
    return genres

def confirm(item):
    """
    Ask user to enter Y or N (case-insensitive).
    :return: True if the answer is Y.
    :rtype: bool
    """
    answer = ""
    while answer not in ["y", "n"]:
        answer = input("OK to go to next"+item+"[y/n]? ").lower()
    return answer == "y"


if __name__ == "__main__":
    walk_playlist()
