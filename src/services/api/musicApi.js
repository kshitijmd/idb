import axios from "axios";
import * as modelTransformers from "../modelTransformers";

const api_host = "api.hackappellas.me";

export function getAlbums(searchParams) {
	return axios.get(`http://${api_host}/albums${searchParams}`).then(response => {
		return {
			itemsPerPage: response.data.per_page,
			currentPage: response.data.page,
			nextPage: response.data.next,
			prevPage: response.data.prev,
			totalPages: response.data.pages,
			data: response.data.albums.map(album => modelTransformers.albumTransformer(album)),
		};
	});
}

export function getArtists(searchParams) {
	return axios.get(`http://${api_host}/artists${searchParams}`).then(response => {
		return {
			itemsPerPage: response.data.per_page,
			currentPage: response.data.page,
			nextPage: response.data.next,
			prevPage: response.data.prev,
			totalPages: response.data.pages,
			data: response.data.artists.map(artist => modelTransformers.artistTransformer(artist)),
		};
	});
}

export function getPlaylists(searchParams) {
	return axios.get(`http://${api_host}/playlists${searchParams}`).then(response => {
		return {
			itemsPerPage: response.data.per_page,
			currentPage: response.data.page,
			nextPage: response.data.next,
			prevPage: response.data.prev,
			totalPages: response.data.pages,
			data: response.data.playlists.map(playlist =>
				modelTransformers.playlistTransformer(playlist)
			),
		};
	});
}

export function getTracks(searchParams) {
	return axios.get(`http://${api_host}/tracks${searchParams}`).then(response => {
		return {
			itemsPerPage: response.data.per_page,
			currentPage: response.data.page,
			nextPage: response.data.next,
			prevPage: response.data.prev,
			totalPages: response.data.pages,
			data: response.data.tracks.map(track => modelTransformers.trackTransformer(track)),
		};
	});
}

export function searchModels(query, page = 1) {
	return axios.get(`http://${api_host}/search/${query}&page=${page}`).then(response => {
		let albums = response.data.albums.map(album => modelTransformers.albumTransformer(album));
		let artists = response.data.artists.map(artist =>
			modelTransformers.artistTransformer(artist)
		);
		let tracks = response.data.tracks.map(track => modelTransformers.trackTransformer(track));
		let playlists = response.data.playlists.map(playlist =>
			modelTransformers.playlistTransformer(playlist)
		);

		let searchData = albums.concat(artists, tracks, playlists);
		return {
			itemsPerPage: response.data.per_page,
			currentPage: response.data.page,
			nextPage: response.data.next,
			prevPage: response.data.prev,
			totalPages: response.data.pages,
			data: searchData,
		};
	});
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
