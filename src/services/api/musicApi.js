// axios docs: https://github.com/axios/axios

function getFakePromise(data) {
	/* Function to assist with testing loading and loaded state */
	//eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Toggle resolve / reject to play with error state
			resolve(data);
			//reject();
		}, 1500);
	});
}

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

	// TODO: Replace with axios request
	return getFakePromise(data).then(data => data);
}

// TODO: Use albumId to make axios GET request
//eslint-disable-next-line no-unused-vars
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

	return getFakePromise(album).then(album => album);
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

	// TODO: Replace with axios request
	return getFakePromise(artists).then(artists => artists);
}

// TODO: Use artistId to make axios GET request
//eslint-disable-next-line no-unused-vars
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

	return getFakePromise(artist).then(artist => artist);
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

	// TODO: Replace with axios request
	return getFakePromise(playlists).then(playlists => playlists);
}

// TODO: Use Id to make axios GET request
//eslint-disable-next-line no-unused-vars
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

	return getFakePromise(playlist).then(playlist => playlist);
}
