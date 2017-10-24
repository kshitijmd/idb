from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Table,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from .database import Base


class Track(Base):
    __tablename__ = "tracks"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    playcount = Column(Integer)
    duration = Column(Integer)

    def __init__(self):
        pass


class Artist(Base):
    __tablename__ = "artists"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))

    def __init__(self):
        pass


class Playlist(Base):
    __tablename__ = "playlists"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    numartists = Column(Integer)
    numsongs = Column(Integer)
    numfollowers = Column(Integer)
    duration = Column(Integer)

    def __init__(self):
        pass


class Album(Base):
    __tablename__ = "albums"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))
    spotifyuri = Column(String(255))
    playcount = Column(Integer)
    releasedate = Column(DateTime)

    def __init__(self):
        pass


class Genre(Base):
    __tablename__ = "genres"
    id = Column(Integer, primary_key=True)
    name = Column(String(1000))

    def __init__(self):
        pass
