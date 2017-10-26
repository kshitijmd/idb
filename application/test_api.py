from app.app import db
from database.models import Track, Artist, Album, Playlist
from database.db_utils import reset_db

reset_db()
t = Track()
t.name = "Diane Young"
t.playcount = 123
t.duration = 456
a = Album()
a.tracks.append(t)
a.name = "Modern Vampires of the City"
ar = Artist()
ar.albums.append(a)
ar.name = "Vampire Weekend"
p = Playlist()
p.name = "sicc Vampire Weekend playlist"
p.tracks.append(t)
p.artists.append(ar)
p.num_tracks = 1

db.session.add_all((t, a, ar, p))
db.session.commit()
