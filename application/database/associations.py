from sqlalchemy import (
    Column,
    Integer,
    Table,
    ForeignKey
)
from .database import Base


# many to many
tracks_playlists = Table('tracks_playlists',
                         Base.metadata,
                         Column('track_id', Integer(),
                                ForeignKey('tracks.id')),
                         Column('playlist_id', Integer(),
                                ForeignKey('playlists.id'))
                         )
tracks_artists = Table('tracks_artists',
                       Base.metadata,
                       Column('track_id', Integer(),
                              ForeignKey('tracks.id')),
                       Column('artist_id', Integer(),
                              ForeignKey('artists.id'))
                       )
artists_playlists = Table('artists_playlists',
                          Base.metadata,
                          Column('artist_id', Integer(),
                                 ForeignKey('artists.id')),
                          Column('playlist_id', Integer(),
                                 ForeignKey('playlists.id'))
                          )
albums_artists = Table('albums_artists',
                       Base.metadata,
                       Column('albums_id', Integer(),
                              ForeignKey('albums.id')),
                       Column('artist_id', Integer(),
                              ForeignKey('artists.id'))
                       )
albums_genres = Table('albums_genres',
                      Base.metadata,
                      Column('album_id', Integer(),
                             ForeignKey('albums.id')),
                      Column('genre_id', Integer(),
                             ForeignKey('genres.id'))
                      )
artists_genres = Table('artists_genres',
                       Base.metadata,
                       Column('artist_id', Integer(),
                              ForeignKey('artists.id')),
                       Column('genre_id', Integer(),
                              ForeignKey('genres.id'))
                       )


"""
relationships not described here:
    - one to many: album_tracks
"""
