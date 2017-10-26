// axios docs: https://github.com/axios/axios

function getFakePromise(data) {
	/* Function to assist with testing loading and loaded state */
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Toggle resolve / reject to play with error state
			resolve(data);
			//reject();
		}, 2500);
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
