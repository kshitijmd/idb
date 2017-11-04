import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

function transformer(album) {
	return {
		id: album.id,
		imageUrl: album.imageUrl,
		title: album.name,
		subtitle: album.artist.name,
		bonusInfo1: `Contains ${album.tracks.length} songs`,
		bonusInfo2: `Released on ${album.releaseDate}`,
		bonusInfo3: `Played ${album.playcount} times on Last.FM`,
	};
}

export default class AlbumGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="albums" modelApiFn={musicApi.getAlbums} />;
	}
}
