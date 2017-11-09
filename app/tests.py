import unittest
import json
from datetime import datetime, timezone
from flask_testing import TestCase
from .app import create_app, db
from .models import Track, Artist, Album, Playlist, Genre
from .api import albums, artists, playlists, tracks, util


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
        a.releasedate = 'Wed, 31 Dec 1969 18:00:00 GMT'
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
        expected = {
            "artists": [{
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
            }],
            "next": None,
            "pages": 1,
            "per_page": 20,
            "prev": None,
            "page": 1
        }
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
        expected = {
            "albums": [{
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
            }],
            "next": None,
            "pages": 1,
            "per_page": 20,
            "prev": None,
            "page": 1
        }
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
        expected = {
            "tracks": [{
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
            }],
            "next": None,
            "pages": 1,
            "per_page": 20,
            "prev": None,
            "page": 1
        }
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
        expected = {
            "playlists": [{
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
            }],
            "next": None,
            "pages": 1,
            "per_page": 20,
            "prev": None,
            "page": 1
        }
        self.log.write('GET /playlists/ \n')
        self.log.write(response.data.decode('utf-8') + '\n')
        self.assertEqual(playlist, expected)


NUM_ALBUMS = 100


class TestApiPagination(TestCase):
    def create_app(self):
        return create_app('test_config.json')

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.populate_db()
        self.log = open('test_pagination.log', 'a')

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.log.close()

    def populate_db(self):
        models = []
        for i in range(1, NUM_ALBUMS + 1):
            a = Album()
            a.name = 'album:' + str(i)
            models.append(a)
        db.session.add_all(models)
        db.session.commit()

    def test_pagination_defaults(self):
        json_response = self.client.get('/albums/')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(response['page'], 1)
        self.assertEqual(response['next'], 2)
        self.assertEqual(response['prev'], None)
        self.assertEqual(response['per_page'], 20)
        self.assertEqual(response['pages'], NUM_ALBUMS // 20)

    def test_pagination_per_page_50(self):
        json_response = self.client.get('/albums/?per_page=50')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(response['page'], 1)
        self.assertEqual(response['next'], 2)
        self.assertEqual(response['prev'], None)
        self.assertEqual(response['per_page'], 50)
        self.assertEqual(response['pages'], NUM_ALBUMS // 50)

    def test_pagination_per_page_50_and_page_2(self):
        json_response = self.client.get('/albums/?per_page=50&page=2')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(response['page'], 2)
        self.assertEqual(response['next'], None)
        self.assertEqual(response['prev'], 1)
        self.assertEqual(response['per_page'], 50)
        self.assertEqual(response['pages'], NUM_ALBUMS // 50)


class TestApiSorting(TestCase):
    def create_app(self):
        return create_app('test_config.json')

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.populate_db()
        self.log = open('test_sorting.log', 'a')

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.log.close()

    def populate_db(self):
        models = []
        # 'a' - 'z' in ASCII
        for i in range(97, 123):
            a = Album()
            a.name = 'album:' + chr(i)
            # 'z' - 'a'
            a.spotify_uri = 'uri:' + opposite_chr(i)
            models.append(a)
        db.session.add_all(models)
        db.session.commit()

    def test_sort_defaults(self):
        json_response = self.client.get(
            '/albums/?order_by=spotify_uri')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        i = 97
        # do it this way in case the per_page default changes
        for a in albums:
            self.assertEqual(a['name'], 'album:' + opposite_chr(i))
            self.assertEqual(a['spotifyUri'], 'uri:' + chr(i))
            i += 1

    def test_sort_desc(self):
        json_response = self.client.get('/albums/?order_by=name&desc=true')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        i = 97
        # do it this way in case the per_page default changes
        for a in albums:
            self.assertEqual(a['name'], 'album:' + opposite_chr(i))
            self.assertEqual(a['spotifyUri'], 'uri:' + chr(i))
            i += 1


class TestApiFiltering(TestCase):
    def create_app(self):
        return create_app('test_config.json')

    def setUp(self):
        db.drop_all()
        db.create_all()
        self.populate_db()
        self.log = open('test_sorting.log', 'a')

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.log.close()

    def populate_db(self):
        models = []
        # 'a' - 'z' in ASCII
        for i in range(97, 123):
            a = Album()
            a.name = 'album:' + chr(i)
            # 'z' - 'a'
            a.spotify_uri = 'uri:' + opposite_chr(i)
            models.append(a)
        db.session.add_all(models)
        db.session.commit()

    def test_filter_include_name(self):
        json_response = self.client.get(
            '/albums/?filter_by=name&include=album:a')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        # we expect only 1 album in albums
        album = albums[0]
        self.assertEqual(album['name'], 'album:a')
        self.assertEqual(album['spotifyUri'], 'uri:z')

    def test_filter_like_name(self):
        json_response = self.client.get('/albums/?filter_by=name&like=album:')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        i = 97
        # do it this way in case the per_page default changes
        for a in albums:
            self.assertEqual(a['name'], 'album:' + chr(i))
            self.assertEqual(a['spotifyUri'], 'uri:' + opposite_chr(i))
            i += 1

    def test_filter_like_exclude_name(self):
        json_response = self.client.get(
            '/albums/?filter_by=name&like=album:&exclude=album:a')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        # change i to 98 because we expect a to be gone
        i = 98
        # do it this way in case the per_page default changes
        for a in albums:
            self.assertEqual(a['name'], 'album:' + chr(i))
            self.assertEqual(a['spotifyUri'], 'uri:' + opposite_chr(i))
            i += 1


class TestApiSearch(TestCase):
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
        a = Album()
        a.name = 'vampire'

        ar = Artist()
        ar.name = 'vampire'
        ar.bio = 'good at music'

        t = Track()
        t.name = 'vampire'

        p = Playlist()
        p.name = 'vampire'

        db.session.add_all((a, ar, t, p))
        db.session.commit()

    def test_search(self):
        json_response = self.client.get(
            '/search/?query=vampire')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        artists = response['artists']
        tracks = response['tracks']
        playlists = response['playlists']
        self.assertEqual(len(albums), 1)
        self.assertEqual(len(artists), 1)
        self.assertEqual(len(tracks), 1)
        self.assertEqual(len(playlists), 1)

    def test_search_bio(self):
        json_response = self.client.get(
            '/search/?query=music')
        response = json.loads(json_response.data.decode('utf-8'))
        albums = response['albums']
        artists = response['artists']
        tracks = response['tracks']
        playlists = response['playlists']
        self.assertEqual(len(albums), 0)
        self.assertEqual(len(artists), 1)
        self.assertEqual(len(tracks), 0)
        self.assertEqual(len(playlists), 0)


class TestApiSearch(TestCase):
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
        all_albums = []
        for i in range(0, 100):
            a = Album()
            a.name = 'vampire ' + str(i)
            all_albums.append(a)
        db.session.add_all(all_albums)
        db.session.commit()

    def test_search_pagination_defaults(self):
        json_response = self.client.get(
            '/search/?query=vampire')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(len(response['albums']), 2)
        self.assertEqual(len(response['artists']), 0)
        self.assertEqual(len(response['tracks']), 0)
        self.assertEqual(len(response['playlists']), 0)
        self.assertEqual(response['pages'], 50)
        self.assertEqual(response['prev'], None)
        self.assertEqual(response['next'], 2)
        self.assertEqual(response['page'], 1)

    def test_search_pagination_default_per_page_next(self):
        json_response = self.client.get(
            '/search/?query=vampire&page=2')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(len(response['albums']), 2)
        self.assertEqual(len(response['artists']), 0)
        self.assertEqual(len(response['tracks']), 0)
        self.assertEqual(len(response['playlists']), 0)
        self.assertEqual(response['pages'], 50)
        self.assertEqual(response['prev'], 1)
        self.assertEqual(response['next'], 3)
        self.assertEqual(response['page'], 2)

    def test_search_pagination_per_page(self):
        json_response = self.client.get(
            '/search/?query=vampire&per_page=100')
        response = json.loads(json_response.data.decode('utf-8'))
        self.assertEqual(len(response['albums']), 100)
        self.assertEqual(len(response['artists']), 0)
        self.assertEqual(len(response['tracks']), 0)
        self.assertEqual(len(response['playlists']), 0)
        self.assertEqual(response['pages'], 1)
        self.assertEqual(response['prev'], None)
        self.assertEqual(response['next'], None)
        self.assertEqual(response['page'], 1)


def opposite_chr(c):
    """
    Get the lowercase alphabet char 'opposite' of ASCII char code c.
    Ex. opposite_chr(97) = 'z' since chr(97) = 'a'
    """
    return chr(97 + (25 - c % 97))
