import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

import ellipsize from "ellipsize";
function transformer(artist) {
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

export default class ArtistGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="artists" modelApiFn={musicApi.getArtists} />;
	}
}
