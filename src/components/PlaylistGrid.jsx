import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

export default class PlaylistGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="playlists" modelApiFn={musicApi.getPlaylists} />;
	}
}
