import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

export default class ArtistGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="artists" modelApiFn={musicApi.getArtists} />;
	}
}
