import axios from "axios";

const api_host = "localhost:8000";

export function getAlbums() {
	return axios.get("http://" + api_host + "/albums/").then(response => response.data.albums);
}

export function getAlbumDetails(albumId) {
	return axios.get(`http://` + api_host + `/albums/${albumId}`).then(response => response.data);
}

export function getArtists() {
	return axios.get(`http://` + api_host + `/artists/`).then(response => response.data.artists);
}

export function getArtistDetails(artistId) {
	return axios.get(`http://` + api_host + `/artists/${artistId}`).then(response => response.data);
}

export function getPlaylists() {
	return axios
		.get(`http://` + api_host + `/playlists/`)
		.then(response => response.data.playlists);
}

export function getPlaylistDetails(playlistId) {
	return axios
		.get(`http://` + api_host + `/playlists/${playlistId}`)
		.then(response => response.data.playlists);
}

export function getTracks() {
	return axios.get(`http://` + api_host + `/tracks/`).then(response => response.data.tracks);
}

export function getTrackDetails(trackId) {
	return axios.get(`http://` + api_host + `/tracks/${trackId}`).then(response => response.data);
}
