from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from .database import Base
from .associations import (
    tracks_playlists,
    tracks_artists,
    artists_playlists,
    albums_artists,
    albums_genres,
    artists_genres
)


class Track(Base):
    __tablename__ = "tracks"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    playcount = Column(Integer)
    duration = Column(Integer)
    album_id = Column(Integer, ForeignKey('albums.id'))
    playlists = relationship(
        "Playlist",
        secondary=tracks_playlists,
        backref="tracks")
    artists = relationship(
        "Artist",
        secondary=tracks_artists,
        backref="tracks")

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Track {}: {}>'.format(self.id, self.name)


class Artist(Base):
    __tablename__ = "artists"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    playlists = relationship(
        "Playlist",
        secondary=artists_playlists,
        backref="artists")
    genres = relationship(
        "Genre",
        secondary=artists_genres,
        backref="genres")

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Artist {}: {}>'.format(self.id, self.name)


class Playlist(Base):
    __tablename__ = "playlists"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    numartists = Column(Integer)
    numsongs = Column(Integer)
    numfollowers = Column(Integer)
    duration = Column(Integer)

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Playlist {}: {}>'.format(self.id, self.name)


class Album(Base):
    __tablename__ = "albums"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    playcount = Column(Integer)
    releasedate = Column(DateTime)
    tracks = relationship('Track')
    artists = relationship(
        "Artist",
        secondary=albums_artists,
        backref="albums")
    genres = relationship(
        "Genre",
        secondary=albums_genres,
        backref="albums")

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Album {}: {}>'.format(self.id, self.name)


class Genre(Base):
    __tablename__ = "genres"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Genre {}: {}>'.format(self.id, self.name)
