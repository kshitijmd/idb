import unittest
import json
from flask_testing import TestCase
from application.app import create_app, db
from application.models import Track, Artist, Album, Playlist, Genre
from application.api import albums, artists, playlists, tracks, util


class TestTrackApi(TestCase):
    def create_app(self):
        return create_app('test_config.json')

    def setUp(self):
        db.create_all()
        self.populate_db()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def populate_db(self):
        g = Genre()
        g.name = "indie"
        t = Track()
        t.name = "Diane Young"
        t.playcount = 123
        t.duration = 456
        t2 = Track()
        t2.name = "I Think Ur A Contra"
        t2.playcount = 123
        t2.duration = 456

        a1 = self.create_vampire_weekend_album("Modern Vampires of the City")
        a1.tracks.append(t)
        a1.genres.append(g)
        a2 = self.create_vampire_weekend_album("Contra")
        a2.tracks.append(t2)
        a2.genres.append(g)

        ar = Artist()
        ar.albums.append(a1)
        ar.albums.append(a2)
        ar.genres.append(g)
        ar.name = "Vampire Weekend"
        p = Playlist()
        p.name = "sicc Vampire Weekend playlist"
        p.tracks.append(t)
        p.tracks.append(t2)
        p.artists.append(ar)
        p.num_tracks = 1

        db.session.add_all((t, t2, a1, a2, ar, p))
        db.session.commit()

    def create_vampire_weekend_album(self, title):
        a = Album()
        a.image_url = "asdf"
        a.playcount = 12345
        a.spotify_uri = "spotify.uri"
        a.name = title
        return a

    def test_get_album_specific(self):
        response = self.client.get('/albums/1')
        album = json.loads(response.data.decode('utf-8'))
        expected = {
            "id": 1,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": None,
            "spotifyUri": "spotify.uri",
            "name": "Modern Vampires of the City",
            "artist": {"id": 1, "name": "Vampire Weekend"},
            "tracks": [{"id": 1, "name": "Diane Young"}],
            "genres": ["indie"]
        }
        self.assertEqual(album, expected)

    def test_get_album_all(self):
        response = self.client.get('/albums/')
        album = json.loads(response.data.decode('utf-8'))
        expected = [{
            "id": 1,
            "imageUrl": "asdf",
            "playcount": 12345,
            "releaseDate": None,
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
            "releaseDate": None,
            "spotifyUri": "spotify.uri",
            "name": "Contra",
            "artist": {"id": 1, "name": "Vampire Weekend"},
            "tracks": [{"id": 2, "name": "I Think Ur A Contra"}],
            "genres": ["indie"]
        }]
        self.assertEqual(album, expected)


if __name__ == '__main__':
    unittest.main()
