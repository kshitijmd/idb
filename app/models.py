# pylint: disable=missing-docstring
# pylint: disable=no-member
# pylint: disable=too-few-public-methods
# pylint: disable=invalid-name
# pylint: disable=trailing-whitespace
# pylint: disable=too-many-arguments
# Junction Tables
from app.app import db

track_playlist = db.Table(
    'track_playlist',
    db.Column(
        'track_id',
        db.Integer,
        db.ForeignKey('track.id')),
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey('playlist.id'))
)

artist_playlist = db.Table(
    'artist_playlist',
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artist.id')),
    db.Column(
        'playlist_id',
        db.Integer,
        db.ForeignKey('playlist.id'))
)

album_genre = db.Table(
    'album_genre',
    db.Column(
        'album_id',
        db.Integer,
        db.ForeignKey('album.id')),
    db.Column(
        'genre_id',
        db.Integer,
        db.ForeignKey('genre.id'))
)

artist_genre = db.Table(
    'artist_genre',
    db.Column(
        'artist_id',
        db.Integer,
        db.ForeignKey('artist.id')),
    db.Column(
        'genre_id',
        db.Integer,
        db.ForeignKey('genre.id'))
)


class Track(db.Model):
    """
    Track is the most basic model in our project. Other models use this
    as a building block.

    Is many-to-one with artist and album and many-to-many with playlists
    The relationship with playlists is unidirectional (track does not link to playlist)

    Attributes:
        id (int): unique identifier
        album_id (int): unique identifier for the album this track appears on
        artist_id (int): unique identifier for the artist of this track
        name (str): name of the track
        playcount (int): number of times this track has been played
        duration (int): length of the track in ms
        spotify_uri (str): spotify uri of this track
        image_url (str): url to the image for this track
    """
    __tablename__ = 'track'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    playcount = db.Column(db.Integer, default=0)
    duration = db.Column(db.Integer, default=0)
    spotify_uri = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    album_id = db.Column(db.Integer, db.ForeignKey('album.id'))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    album = db.relationship('Album', back_populates='tracks')
    artist = db.relationship('Artist', back_populates='tracks')

    def __serialize__(self):
        return {
            "id": self.id,
            "name": self.name,
            "playcount": self.playcount,
            "duration": self.duration,
            "spotifyUri": self.spotify_uri,
            "imageUrl": self.image_url,
            "album": {
                "id": self.album_id,
                "name": self.album.name if self.album else None
            },
            "artist": {
                "id": self.artist_id,
                "name": self.artist.name if self.artist else None
            }
        }

    def __repr__(self):
        return '<Track {}: {!r}>'.format(self.id, self.name)


class Artist(db.Model):
    """
    Artist is the top relation of our model hierarchy

    Is one-to-many with track and album, many-to-many with playlist and genre
    The relationship with playlists is unidirectional (artist does not link to playlist)

    Attributes:
        id (int): unique identifier
        name (str): name of the artist
        playcount (int): number of times this artists tracks have been played
        spotify_uri (str): spotify uri for this artist
        image_url (str): url of the image for this artist
    """
    __tablename__ = 'artist'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    bio = db.Column(db.Text)
    spotify_uri = db.Column(db.String(255))
    playcount = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255))

    tracks = db.relationship('Track', back_populates='artist')
    albums = db.relationship('Album', back_populates='artist')

    genres = db.relationship('Genre', secondary=artist_genre)

    def __serialize__(self):
        return {
            "id": self.id,
            "name": self.name,
            "bio": self.bio,
            "spotifyUri": self.spotify_uri,
            "playcount": self.playcount,
            "imageUrl": self.image_url,
            "tracks": [{"id": track.id, "name": track.name} for track in self.tracks],
            "albums": [{"id": album.id, "name": album.name} for album in self.albums],
            "genres": [genre.name for genre in self.genres]
        }

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
    __tablename__ = 'playlist'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    spotify_uri = db.Column(db.String(255))
    num_artists = db.Column(db.Integer, default=0)
    num_tracks = db.Column(db.Integer, default=0)
    num_followers = db.Column(db.Integer, default=0)
    duration = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255))

    # No backpopulation, only want unidirectional links
    tracks = db.relationship('Track', secondary=track_playlist)
    artists = db.relationship('Artist', secondary=artist_playlist)

    def __serialize__(self):
        return {
            "id": self.id,
            "name": self.name,
            "numFollowers": self.num_followers,
            "numArtists": self.num_artists,
            "spotifyUri": self.spotify_uri,
            "duration": self.duration,
            "numTracks": self.num_tracks,
            "imageUrl": self.image_url,
            "tracks": [{"id": track.id, "name": track.name} for track in self.tracks],
            "artists": [{"id": artist.id, "name": artist.name} for artist in self.artists]
        }

    def __repr__(self):
        return '<Playlist {}: {!r}>'.format(self.id, self.name)


class Album(db.Model):
    """
    Album lies between track and artist in the hierarchy

    Album has a one-to-many relationship with track,
    many-to-one with artist, 
    and many-to-many with playlist and genre

    Attributes:
        id (int): unique identifier
        artist_id (int): unique identifier of the artist for this album 
        name (str): name of the album
        spotify_uri (str): spotify uri for the album
        playcount (int): playcount of the album
        releasedate (date): release date of the album
    """
    __tablename__ = 'album'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    spotify_uri = db.Column(db.String(255))
    playcount = db.Column(db.Integer)
    releasedate = db.Column(db.DateTime)
    image_url = db.Column(db.String(255))

    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    artist = db.relationship('Artist', back_populates='albums')

    tracks = db.relationship('Track', back_populates='album')
    genres = db.relationship('Genre', secondary=album_genre)

    def __serialize__(self):
        return {
            "id": self.id,
            "name": self.name,
            "playcount": self.playcount,
            "releaseDate": self.releasedate,
            "spotifyUri": self.spotify_uri,
            "imageUrl": self.image_url,
            "artist": {
                "id": self.artist_id,
                "name": self.artist.name if self.artist else None
            },
            "tracks": [{"id": track.id, "name": track.name} for track in self.tracks],
            "genres": [genre.name for genre in self.genres]
        }

    def __repr__(self):
        return '<Album {}: {!r}>'.format(self.id, self.name)


class Genre(db.Model):
    """
    Genre is a secondary model which is included associated with
    artists and albums

    Has many-to-many relationships with album and artist
    The links are unidirectional (don't appear in Genre)

    Attributes:
        id (int): unique identifer
        name (str): name of the genre
    """
    __tablename__ = 'genre'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, index=True, nullable=False)

    def __repr__(self):
        return '<Genre {}: {!r}>'.format(self.id, self.name)
