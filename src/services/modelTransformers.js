import ellipsize from "ellipsize";
import getYear from "date-fns/get_year";

export function albumTransformer(album) {
	return {
		id: album.id,
		imageUrl: album.imageUrl,
		title: album.name,
		subtitle: album.artist.name,
		bonusInfo1: `Contains ${album.tracks.length} songs`,
		bonusInfo2: `Released in ${getYear(album.releaseDate)}`,
		bonusInfo3: `Played ${album.playcount} times on Last.FM`,
	};
}

export function playlistTransformer(playlist) {
	return {
		id: playlist.id,
		imageUrl: playlist.imageUrl,
		title: playlist.name,
		subtitle: `Duration: ${playlist.duration}`,
		bonusInfo1: `${playlist.numTracks} tracks`,
		bonusInfo2: `${playlist.numArtists} artists`,
		bonusInfo3: `${playlist.numFollowers} followers`,
	};
}

export function trackTransformer(track) {
	return {
		id: track.id,
		imageUrl: track.imageUrl,
		title: track.name,
		subtitle: `By ${track.artist.name}`,
		bonusInfo1: `Featured on album ${track.album.name}`,
		bonusInfo2: `${track.duration} seconds long`,
		bonusInfo3: `Played ${track.playcount} times on Last.FM`,
	};
}

export function artistTransformer(artist) {
	return {
		id: artist.id,
		imageUrl: artist.imageUrl,
		title: artist.name,
		subtitle: `Genre: ${artist.genres[0]}`,
		bonusInfo1: `Played ${artist.playcount} times on Last.FM`,
		bonusInfo2: `${artist.albums.length} albums available`,
		bonusInfo3: `Bio: ${ellipsize(artist.bio, 100)}`,
	};
}
