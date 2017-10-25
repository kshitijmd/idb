import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Grab data from tracks from Spotify
# def show_tracks(tracks):
#     for i, item in enumerate(tracks['items']):
#             track = item['track']
#             print ("%d %32.32s %s %32.32s" % (i+1, track['artists'][0]['name'], track['name'], track['album']['name']))



def show_playlists():
    # Grab data from feature playlists from Spotify
    playlists = sp.featured_playlists('spotify')
    playlists = playlists['playlists']
    while playlists:
        for i, playlist in enumerate(playlists['items']):
            print("%4d %s %s %s" % (i + 1 + playlists['offset'], playlist['uri'],  playlist['name'], playlist['tracks']))
            # Call helper function to print out track, artist, album info per song in playlist
            tracks = playlist['tracks']
            results = sp.user_playlist('spotify', playlist['id'], fields="tracks,next,followers")
            #print("HERE FOLLOWERS " , results['followers']['total'])
            tracks = results['tracks']
            show_tracks(tracks)
            while tracks['next']:
                tracks = sp.next(tracks)
                show_tracks(tracks)

        if playlists['next']:
            playlists = sp.next(playlists)
        else:
            playlists = None
    

def build_playlist():
    playlists = []
    paging = sp.featured_playlists('spotify')
    playlist = paging['playlists']
    print("hi")
    while playlist:
        for i, actual_playlist in enumerate(playlist['items']):
            pl = {"name" : None, "spotifyuri" : None, "numartists" : None, "numtracks" : None, "followers" : None, "duration" : None,
                  "tracks" : None, "artists" : None}

            pl["name"] = actual_playlist['name']
            pl["spotifyuri"] = actual_playlist['uri']
            pl["numtracks"] = actual_playlist['tracks']['total']
            artists = set();
            track_list = []

            tracks_po = actual_playlist['tracks']
            results = sp.user_playlist('spotify', actual_playlist['id'], fields="tracks,next, followers")
            tracks = results['tracks']

            duration = 0
            for item in tracks['items']:
                track = item['track']
                # Grab the artist of the track, add to the set of artists
                artists.add(track['artists'][0]['name'])
                track_list.append(track['name'])
                duration += (track['duration_ms']/1000)

            pl['followers'] = results['followers']['total']
            pl['numtracks'] = len(track_list)
            pl['numartists'] = len(artists)
            pl['artists'] = artists
            pl['tracks'] = track_list
            pl['duration'] = duration
            # get followers too
        playlists.append(pl)    

    print(playlists)
    return playlists


if __name__ == "__main__":
    #show_playlists()
    plays = build_playlist()
