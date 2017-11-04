import React from "react";
import CardGridList from "./CardGridList";
import * as musicApi from "../services/api/musicApi";

export default class AlbumGrid extends React.Component {
	render() {
		return <CardGridList routerBaseUrl="albums" modelApiFn={musicApi.getAlbums} />;
	}
}
