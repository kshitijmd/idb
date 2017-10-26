import unittest
import json
from datetime import datetime, timezone
from flask_testing import TestCase
from application.app import create_app, db
from application.models import Track, Artist, Album, Playlist, Genre
from application.api import albums, artists, playlists, tracks, util


class TestApi(TestCase):
    def create_app(self):
        return create_app('test_config.json')

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.populate_db()
        self.log = open('test.log', 'a')

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.log.close()

    def populate_db(self):
        g1 = self.create_genre("indie")
        g2 = self.create_genre("rock")

        t1 = self.create_track("Diane Young")
        t2 = self.create_track("I Think Ur A Contra")
        t3 = self.create_track("Down By The Sea")

        a1 = self.create_album("Modern Vampires of the City")
        a1.tracks.append(t1)
        a1.genres.append(g1)
        a2 = self.create_album("Contra")
        a2.tracks.append(t2)
        a2.genres.append(g1)
        a3 = self.create_album("Business As Usual")
        a3.tracks.append(t3)
        a3.genres.append(g2)

        ar1 = self.create_artist("Vampire Weekend")
        ar1.albums.append(a1)
        ar1.albums.append(a2)
        ar1.genres.append(g1)
        ar1.tracks.append(t1)
        ar1.tracks.append(t2)
        ar2 = self.create_artist("Men At Work")
        ar2.albums.append(a3)
        ar2.genres.append(g2)
        ar2.tracks.append(t3)

        a1.artist = ar1
        a2.artist = ar1
        a3.artist = ar2

        t1.artist = ar1
        t1.album = a1
        t2.artist = ar1
        t2.album = a2
        t3.artist = ar2
        t3.album = a3

        p1 = self.create_playlist("sicc Vampire Weekend playlist", 2)
        p1.tracks.append(t1)
        p1.tracks.append(t2)
        p1.artists.append(ar1)
        p2 = self.create_playlist("Dad Rock jams", 1)
        p2.tracks.append(t3)
        p2.artists.append(ar2)

        db.session.add_all((t1, t2, t3, a1, a2, a3, ar1, ar2, p1, p2))
        db.session.commit()

    def create_artist(self, title):
        ar = Artist()
        ar.image_url = "asdf"
        ar.playcount = 12345
        ar.bio = "This band is super cool!"
        ar.spotify_uri = "spotify.uri"
        ar.name = title
        return ar

    def create_album(self, title):
        a = Album()
        a.image_url = "asdf"
        a.playcount = 12345
        a.spotify_uri = "spotify.uri"
        a.releasedate = datetime(1970, 1, 1, tzinfo=timezone.utc)
        a.name = title
        return a

    def create_track(self, title):
        t = Track()
        t.image_url = "asdf"
        t.playcount = 12345
        t.duration = 456
        t.spotify_uri = "spotify.uri"
        t.name = title
        return t

    def create_playlist(self, title, numtracks):
        p = Playlist()
        p.image_url = "asdf"
        p.num_followers = 21
        p.num_artists = 1
        p.num_tracks = numtracks
        p.duration = 456
        p.spotify_uri = "spotify.uri"
        p.name = title
        return p

    def create_genre(self, title):
        g = Genre()
        g.name = title
        return g

    def test_get_artist_specific(self):
        response = self.client.get('/artists/1')
        artist = json.loads(response.data.decode('utf-8'))
        expected = {
            "id": 1,
            "name": "Vampire Weekend",
            "bio": "This band is super cool!",
            "spotifyUri": "spotify.uri",
            "playcount": 12345,
            "imageUrl": "asdf",
            "tracks": [{"id": 1, "name": "Diane Young"}, {"id": 2, "name": "I Think Ur A Contra"}],
            "albums": [{"id": 1, "name": "Modern Vampires of the City"}, {"id": 2, "name": "Contra"}],
            "genres": ["indie"]
        }
        self.log.write('GET /artists/1 \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(artist, expected)

    def test_get_artist_all(self):
        response = self.client.get('/artists/')
        artist = json.loads(response.data.decode('utf-8'))
        expected = [{
            "id": 1,
            "name": "Vampire Weekend",
            "bio": "This band is super cool!",
            "spotifyUri": "spotify.uri",
            "playcount": 12345,
            "imageUrl": "asdf",
            "tracks": [{"id": 1, "name": "Diane Young"}, {"id": 2, "name": "I Think Ur A Contra"}],
            "albums": [{"id": 1, "name": "Modern Vampires of the City"}, {"id": 2, "name": "Contra"}],
            "genres": ["indie"]
        },
            {
            "id": 2,
            "name": "Men At Work",
            "bio": "This band is super cool!",
            "spotifyUri": "spotify.uri",
            "playcount": 12345,
            "imageUrl": "asdf",
            "tracks": [{"id": 3, "name": "Down By The Sea"}],
            "albums": [{"id": 3, "name": "Business As Usual"}],
            "genres": ["rock"]
        }]
        self.log.write('GET /artists/ \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(artist, expected)

    def test_get_album_specific(self):
        response = self.client.get('/albums/1')
        album = json.loads(response.data.decode('utf-8'))
        expected = {
            "id": 1,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": 'Wed, 31 Dec 1969 18:00:00 GMT',
            "spotifyUri": "spotify.uri",
            "name": "Modern Vampires of the City",
            "artist": {"id": 1, "name": "Vampire Weekend"},
            "tracks": [{"id": 1, "name": "Diane Young"}],
            "genres": ["indie"]
        }
        self.log.write('GET /albums/1 \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(album, expected)

    def test_get_album_all(self):
        response = self.client.get('/albums/')
        album = json.loads(response.data.decode('utf-8'))
        expected = [{
            "id": 1,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": 'Wed, 31 Dec 1969 18:00:00 GMT',
            "spotifyUri": "spotify.uri",
            "name": "Modern Vampires of the City",
            "artist": {"id": 1, "name": "Vampire Weekend"},
            "tracks": [{"id": 1, "name": "Diane Young"}],
            "genres": ["indie"]
        },
            {
            "id": 2,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": 'Wed, 31 Dec 1969 18:00:00 GMT',
            "spotifyUri": "spotify.uri",
            "name": "Contra",
            "artist": {"id": 1, "name": "Vampire Weekend"},
            "tracks": [{"id": 2, "name": "I Think Ur A Contra"}],
            "genres": ["indie"]
        },
            {
            "id": 3,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": 'Wed, 31 Dec 1969 18:00:00 GMT',
            "spotifyUri": "spotify.uri",
            "name": "Business As Usual",
            "artist": {"id": 2, "name": "Men At Work"},
            "tracks": [{"id": 3, "name": "Down By The Sea"}],
            "genres": ["rock"]

        }]
        self.log.write('GET /albums/ \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(album, expected)

    def test_get_track_specific(self):
        response = self.client.get('/tracks/1')
        track = json.loads(response.data.decode('utf-8'))
        expected = {
            "id": 1,
            "name": "Diane Young",
            "playcount": 12345,
            "duration": 456,
            "spotifyUri": "spotify.uri",
            "imageUrl": "asdf",
            "album": {
                "id": 1,
                "name": "Modern Vampires of the City"
            },
            "artist": {
                "id": 1,
                "name": "Vampire Weekend"
            }
        }
        self.log.write('GET /tracks/1 \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(track, expected)

    def test_get_track_all(self):
        response = self.client.get('/tracks/')
        track = json.loads(response.data.decode('utf-8'))
        expected = [{
            "id": 1,
            "name": "Diane Young",
            "playcount": 12345,
            "duration": 456,
            "spotifyUri": "spotify.uri",
            "imageUrl": "asdf",
            "album": {
                "id": 1,
                "name": "Modern Vampires of the City"
            },
            "artist": {
                "id": 1,
                "name": "Vampire Weekend"
            }
        },
            {
            "id": 2,
            "name": "I Think Ur A Contra",
            "playcount": 12345,
            "duration": 456,
            "spotifyUri": "spotify.uri",
            "imageUrl": "asdf",
            "album": {
                "id": 2,
                "name": "Contra"
            },
            "artist": {
                "id": 1,
                "name": "Vampire Weekend"
            }
        },
            {
            "id": 3,
            "name": "Down By The Sea",
            "playcount": 12345,
            "duration": 456,
            "spotifyUri": "spotify.uri",
            "imageUrl": "asdf",
            "album": {
                "id": 3,
                "name": "Business As Usual"
            },
            "artist": {
                "id": 2,
                "name": "Men At Work"
            }
        }]
        self.log.write('GET /tracks/ \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(track, expected)

    def test_get_playlist_specific(self):
        response = self.client.get('/playlists/1')
        playlist = json.loads(response.data.decode('utf-8'))
        expected = {
            "id": 1,
            "name": "sicc Vampire Weekend playlist",
            "numFollowers": 21,
            "numArtists": 1,
            "imageUrl": "asdf",
            "spotifyUri": "spotify.uri",
            "duration": 456,
            "numTracks": 2,
            "tracks": [{"id": 1, "name": "Diane Young"}, {"id": 2, "name": "I Think Ur A Contra"}],
            "artists": [{"id": 1, "name": "Vampire Weekend"}]
        }
        self.log.write('GET /playlists/1 \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(playlist, expected)

    def test_get_playlist_all(self):
        response = self.client.get('/playlists/')
        playlist = json.loads(response.data.decode('utf-8'))
        expected = [{
            "id": 1,
            "name": "sicc Vampire Weekend playlist",
            "numFollowers": 21,
            "numArtists": 1,
            "imageUrl": "asdf",
            "spotifyUri": "spotify.uri",
            "duration": 456,
            "numTracks": 2,
            "tracks": [{"id": 1, "name": "Diane Young"}, {"id": 2, "name": "I Think Ur A Contra"}],
            "artists": [{"id": 1, "name": "Vampire Weekend"}]
        },
            {
            "id": 2,
            "name": "Dad Rock jams",
            "numFollowers": 21,
            "imageUrl": "asdf",
            "numArtists": 1,
            "spotifyUri": "spotify.uri",
            "duration": 456,
            "numTracks": 1,
            "tracks": [{"id": 3, "name": "Down By The Sea"}],
            "artists": [{"id": 2, "name": "Men At Work"}]
        }]
        self.log.write('GET /playlists/ \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(playlist, expected)


if __name__ == '__main__':
    unittest.main()
