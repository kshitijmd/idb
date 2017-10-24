# pylint: disable=missing-docstring
# pylint: disable=no-member
# pylint: disable=too-few-public-methods
# pylint: disable=invalid-name
# pylint: disable=trailing-whitespace
# pylint: disable=too-many-arguments

from application.app import db


class Track(db.Model):
    """
    Track is the most basic model in our project. Other models use this
    as a building block.

    It has a many-to-one relationship with album and
    many-to-many relationships with artists and playlists

    The relationship with playlists is unidirectional (track does not link to playlist)

    Attributes:
        id (int): unique identifier
        album_id (int): unique identifier for the album this track appears on
        name (str): name of the track
        playcount (int): number of times this track has been played
        duration (int): length of the track in ms
        spotify_uri (str): spotify uri of this track
        image_url (str): url to the image for this track
    """
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    playcount = db.Column(db.Integer, default=0)
    duration = db.Column(db.Integer, default=0)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    spotify_uri = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    playlists = db.relationship(
        'Playlist',
        secondary=tracks_playlists,
        back_populates='tracks')
    artists = db.relationship(
        'Artist',
        secondary=tracks_artists,
        back_populates='tracks')

    def __init__(self, name, album_id=None, image_url=None,
                 playcount=0, duration=0, spotify_uri=None):
        self.name = name
        self.spotify_uri = spotify_uri
        self.image_url = image_url
        self.playcount = playcount
        self.duration = duration
        self.album_id = album_id

    def __repr__(self):
        return '<Track {}: {!r}>'.format(self.id, self.name)


class Artist(db.Model):
    """
    Artist is the top relation of our model hierarchy

    Artist has many-to-many relations with track, album, genre,
    and playlist

    The relationship with playlists is unidirectional (artist does not link to playlist)

    Attributes:
        id (int): unique identifier
        name (str): name of the artist
        playcount (int): number of times this artists tracks have been played
        spotify_uri (str): spotify uri for this artist
        image_url (str): url of the image for this artist
    """
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    bio = db.Column(db.Text)
    spotify_uri = db.Column(db.String(255))
    playcount = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255))

    tracks = db.relationship(
        'Track',
        secondary=tracks_artists,
        back_populates='artists')
    albums = db.relationship(
        'Album',
        secondary=albums_artists,
        back_populates='artists')
    playlists = db.relationship(
        'Playlist',
        secondary=artists_playlists,
        back_populates='artists')
    genres = db.relationship(
        'Genre',
        secondary=artists_genres,
        back_populates='artists')

    def __init__(self, name, bio=None, image_url=None,
                 spotify_uri=None, playcount=0):
        self.name = name
        self.bio = bio
        self.image_url = image_url
        self.spotify_uri = spotify_uri
        self.playcount = playcount

    def __repr__(self):
        return '<Artist {}: {!r}>'.format(self.id, self.name)


class Playlist(db.Model):
    """
    Playlist is somewhat outside the main relations of
    artist, album and track; It is a collection of tracks,
    and includes some basic statistics

    Playlist has many-to-many relationships with artist and track
    Playlist has links to artist and track, but not the other way around

    Attributes:
        id (int): unique identifier for this playlist
        name (str): name of this playlist
        spotify_uri (str): spotify uri for this playlist
        num_artists (int): number of artists appearing on this playlist
        num_songs (int): number of songs on this playlist
        num_followers (int): number of people who follow the playlist on spotify
        duration (int): length of the playlist in ms
        image_url (str): image url for the playlist
    """
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    spotify_uri = db.Column(db.String(255))
    num_artists = db.Column(db.Integer, default=0)
    num_songs = db.Column(db.Integer, default=0)
    num_followers = db.Column(db.Integer, default=0)
    duration = db.Column(db.Integer, default=0)

    # No backpopulation, only want unidirectional links
    db.relationship('Track', secondary=tracks_playlists)
    db.relationship('Artist', secondary=artists_playlists)

    def __init__(self, name, spotify_uri=None, num_artists=0, num_songs=0,
                 num_followers=0, duration=0, image_url=None):
        self.name = name
        self.spotify_uri = spotify_uri
        self.num_artists = num_artists
        self.num_songs = num_songs
        self.num_followers = num_followers
        self.duration = duration
        self.image_url = image_url

    def __repr__(self):
        return '<Playlist {}: {!r}>'.format(self.id, self.name)


class Album(db.Model):
    """
    Album lies between track and artist in the hierarchy

    Album has a one-to-many relationship with track,
    and many-to-many relationships with artist, playlist and genre

    Attributes:
        id (int): unique identifier
        name (str): name of the album
        spotify_uri (str): spotify uri for the album
        playcount (int): playcount of the album
        releasedate (date): release date of the album
    """
    __tablename__ = "albums"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    spotify_uri = db.Column(db.String(255))
    playcount = db.Column(db.Integer)
    releasedate = db.Column(db.DateTime)

    tracks = db.relationship('Track', backref='Album')
    artists = db.elationship(
        'Artist',
        secondary=albums_artists,
        back_populates='albums')
    genres = db.relationship(
        'Genre',
        secondary=albums_genres)

    def __init__(self, name, spotify_uri=None, playcount=0, releasedate=None):
        self.name = name
        self.spotify_uri = spotify_uri
        self.playcount = playcount
        self.releasedate = releasedate

    def __repr__(self):
        return '<Album {}: {!r}>'.format(self.id, self.name)


class Genre(db.Model):
    """
    Genre is a secondary model which is included associated with
    artists and albums

    It has many-to-many relationships with album and artist
    The links are unidirectional (don't appear in Genre)

    Attributes:
        id (int): unique identifer
        name (str): name of the genre
    """
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, index=True, nullable=False)

    albums = db.relationship(
        'Album',
        secondary=albums_genres,
        back_populates='genres')
    artists = db.relationship(
        'Artist',
        secondary=artists_genres,
        back_populates='genres')

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Genre {}: {!r}>'.format(self.id, self.name)


# Junction tables

tracks_playlists = db.Table(
    'tracks_playlists',
    db.Column(
        'track_id',
        db.Integer,
        db.ForeignKey('tracks.id'),
        primary_key=True),
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey('playlists.id'),
        primary_key=True)
)

tracks_artists = db.Table(
    'tracks_artists',
    db.Column(
        'track_id',
        db.Integer,
        db.ForeignKey('tracks.id'),
        primary_key=True),
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artists.id'),
        primary_key=True)
)

artists_playlists = db.Table(
    'artists_playlists',
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artists.id'),
        primary_key=True),
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey('playlists.id'),
        primary_key=True)
)

albums_artists = db.Table(
    'albums_artists',
    db.Column(
        'albums_id',
        db.Integer,
        db.ForeignKey('albums.id'),
        primary_key=True),
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artists.id'),
        primary_key=True)
)

albums_genres = db.Table(
    'albums_genres',
    db.Column(
        'album_id',
        db.Integer,
        db.ForeignKey('albums.id'),
        primary_key=True),
    db.Column(
        'genre_id',
        db.Integer,
        db.ForeignKey('genres.id'),
        primary_key=True)
)

artists_genres = db.Table(
    'artists_genres',
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artists.id'),
        primary_key=True),
    db.Column(
        'genre_id',
        db.Integer,
        db.ForeignKey('genres.id'),
        primary_key=True)
)
