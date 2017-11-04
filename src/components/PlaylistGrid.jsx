import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

function transformer(playlist) {
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

export default class PlaylistGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="playlists" modelApiFn={musicApi.getPlaylists} />;
	}
}
