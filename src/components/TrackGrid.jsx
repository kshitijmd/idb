import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

function transformer(track) {
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

export default class TrackGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="tracks" modelApiFn={musicApi.getTracks} />;
	}
}
