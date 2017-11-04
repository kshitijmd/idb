import axios from "axios";
import * as modelTransformers from "../modelTransformers";

const api_host = "dev-api.hackappellas.me";

export function getAlbums() {
	return axios
		.get("http://" + api_host + "/albums/")
		.then(response =>
			response.data.albums.map(album => modelTransformers.albumTransformer(album))
		);
}

export function getArtists() {
	return axios
		.get(`http://` + api_host + `/artists/`)
		.then(response =>
			response.data.artists.map(artist => modelTransformers.artistTransformer(artist))
		);
}

export function getPlaylists() {
	return axios
		.get(`http://` + api_host + `/playlists/`)
		.then(response =>
			response.data.playlists.map(playlist => modelTransformers.playlistTransformer(playlist))
		);
}

export function getTracks() {
	return axios
		.get(`http://` + api_host + `/tracks/`)
		.then(response =>
			response.data.tracks.map(track => modelTransformers.trackTransformer(track))
		);
}

export function getAlbumDetails(albumId) {
	return axios.get(`http://` + api_host + `/albums/${albumId}`).then(response => response.data);
}

export function getArtistDetails(artistId) {
	return axios.get(`http://` + api_host + `/artists/${artistId}`).then(response => response.data);
}

export function getPlaylistDetails(playlistId) {
	return axios
		.get(`http://` + api_host + `/playlists/${playlistId}`)
		.then(response => response.data);
}

export function getTrackDetails(trackId) {
	return axios.get(`http://` + api_host + `/tracks/${trackId}`).then(response => response.data);
}
