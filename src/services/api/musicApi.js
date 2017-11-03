import axios from "axios";
import * as logger from "../logger";

var api_host = "localhost:8000";

export function getAlbums() {
	const data = [
		{
			artist: {
				id: 1,
				name: "Vampire Weekend",
			},
			genres: ["indie"],
			id: 1,
			imageUrl: "asdf",
			name: "Modern Vampires of the City",
			playcount: 12345,
			releaseDate: "Wed, 31 Dec 1969 18:00:00 GMT",
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 1,
					name: "Diane Young",
				},
			],
		},
		{
			artist: {
				id: 1,
				name: "Vampire Weekend",
			},
			genres: ["indie"],
			id: 2,
			imageUrl: "asdf",
			name: "Contra",
			playcount: 12345,
			releaseDate: "Wed, 31 Dec 1969 18:00:00 GMT",
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 2,
					name: "I Think Ur A Contra",
				},
			],
		},
		{
			artist: {
				id: 2,
				name: "Men At Work",
			},
			genres: ["rock"],
			id: 3,
			imageUrl: "asdf",
			name: "Business As Usual",
			playcount: 12345,
			releaseDate: "Wed, 31 Dec 1969 18:00:00 GMT",
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 3,
					name: "Down By The Sea",
				},
			],
		},
	];

	return axios
		.get("http://" + api_host + "/albums/")
		.then(response => response.data.albums)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return data;
		});
}

export function getAlbumDetails(albumId) {
	const album = {
		artist: {
			id: 1,
			name: "Vampire Weekend",
		},
		genres: ["indie"],
		id: 1,
		imageUrl: "asdf",
		name: "Modern Vampires of the City",
		playcount: 12345,
		releaseDate: "Wed, 31 Dec 1969 18:00:00 GMT",
		spotifyUri: "spotify.uri",
		tracks: [
			{
				id: 1,
				name: "Diane Young",
			},
		],
	};

	return axios
		.get(`http://` + api_host + `/albums/${albumId}`)
		.then(response => response.data)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return album;
		});
}

export function getArtists() {
	const artists = [
		{
			albums: [
				{
					id: 1,
					name: "Modern Vampires of the City",
				},
				{
					id: 2,
					name: "Contra",
				},
			],
			bio: "This band is super cool!",
			genres: ["indie"],
			id: 1,
			imageUrl: "asdf",
			name: "Vampire Weekend",
			playcount: 12345,
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 1,
					name: "Diane Young",
				},
				{
					id: 2,
					name: "I Think Ur A Contra",
				},
			],
		},
		{
			albums: [
				{
					id: 3,
					name: "Business As Usual",
				},
			],
			bio: "This band is super cool!",
			genres: ["rock"],
			id: 2,
			imageUrl: "asdf",
			name: "Men At Work",
			playcount: 12345,
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 3,
					name: "Down By The Sea",
				},
			],
		},
	];

	return axios
		.get(`http://` + api_host + `/artists/`)
		.then(response => response.data.artists)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return artists;
		});
}

export function getArtistDetails(artistId) {
	const artist = {
		albums: [
			{
				id: 1,
				name: "Modern Vampires of the City",
			},
			{
				id: 2,
				name: "Contra",
			},
		],
		bio: "This band is super cool!",
		genres: ["indie"],
		id: 1,
		imageUrl: "asdf",
		name: "Vampire Weekend",
		playcount: 12345,
		spotifyUri: "spotify.uri",
		tracks: [
			{
				id: 1,
				name: "Diane Young",
			},
			{
				id: 2,
				name: "I Think Ur A Contra",
			},
		],
	};

	return axios
		.get(`http://` + api_host + `/artists/${artistId}`)
		.then(response => response.data)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return artist;
		});
}

export function getPlaylists() {
	const playlists = [
		{
			artists: [
				{
					id: 1,
					name: "Vampire Weekend",
				},
			],
			duration: 456,
			id: 1,
			name: "sicc Vampire Weekend playlist",
			numArtists: 1,
			numFollowers: 21,
			numTracks: 2,
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 1,
					name: "Diane Young",
				},
				{
					id: 2,
					name: "I Think Ur A Contra",
				},
			],
		},
		{
			artists: [
				{
					id: 2,
					name: "Men At Work",
				},
			],
			duration: 456,
			id: 2,
			name: "Dad Rock jams",
			numArtists: 1,
			numFollowers: 21,
			numTracks: 1,
			spotifyUri: "spotify.uri",
			tracks: [
				{
					id: 3,
					name: "Down By The Sea",
				},
			],
		},
	];

	return axios
		.get(`http://` + api_host + `/playlists/`)
		.then(response => response.data.playlists)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return playlists;
		});
}

export function getPlaylistDetails(playlistId) {
	const playlist = {
		artists: [
			{
				id: 1,
				name: "Vampire Weekend",
			},
		],
		duration: 456,
		id: 1,
		name: "sicc Vampire Weekend playlist",
		numArtists: 1,
		numFollowers: 21,
		numTracks: 2,
		spotifyUri: "spotify.uri",
		tracks: [
			{
				id: 1,
				name: "Diane Young",
			},
			{
				id: 2,
				name: "I Think Ur A Contra",
			},
		],
	};

	return axios
		.get(`http://` + api_host + `/playlists/${playlistId}`)
		.then(response => response.data.playlists)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return playlist;
		});
}

export function getTracks() {
	const tracks = [
		{
			album: {
				id: 1,
				name: "Modern Vampires of the City",
			},
			artist: {
				id: 1,
				name: "Vampire Weekend",
			},
			duration: 456,
			id: 1,
			imageUrl: "asdf",
			name: "Diane Young",
			playcount: 12345,
			spotifyUri: "spotify.uri",
		},
		{
			album: {
				id: 2,
				name: "Contra",
			},
			artist: {
				id: 1,
				name: "Vampire Weekend",
			},
			duration: 456,
			id: 2,
			imageUrl: "asdf",
			name: "I Think Ur A Contra",
			playcount: 12345,
			spotifyUri: "spotify.uri",
		},
		{
			album: {
				id: 3,
				name: "Business As Usual",
			},
			artist: {
				id: 2,
				name: "Men At Work",
			},
			duration: 456,
			id: 3,
			imageUrl: "asdf",
			name: "Down By The Sea",
			playcount: 12345,
			spotifyUri: "spotify.uri",
		},
	];

	return axios
		.get(`http://` + api_host + `/tracks/`)
		.then(response => response.data.tracks)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return tracks;
		});
}

export function getTrackDetails(trackId) {
	const track = {
		album: {
			id: 1,
			name: "Modern Vampires of the City",
		},
		artist: {
			id: 1,
			name: "Vampire Weekend",
		},
		duration: 456,
		id: 1,
		imageUrl: "asdf",
		name: "Diane Young",
		playcount: 12345,
		spotifyUri: "spotify.uri",
	};

	return axios
		.get(`http://` + api_host + `/tracks/${trackId}`)
		.then(response => response.data)
		.catch(err => {
			logger.error("API request failed; returning mock data instance");
			logger.error(err);
			return track;
		});
}
