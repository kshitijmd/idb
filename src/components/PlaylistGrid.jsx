import React from "react";
import CardGridList from "./CardGridList";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as musicApi from "../services/api/musicApi";
import * as logger from "../services/logger";

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
	state = {
		data: undefined,
	};

	componentDidMount() {
		musicApi
			.getPlaylists()
			.then(data =>
				this.setState({
					data: data.map(playlist => transformer(playlist)),
				})
			)
			.catch(err => {
				logger.error(err);
				this.setState({ data: null });
			});
	}

	_renderData = () => <CardGridList routerBaseUrl="playlists" data={this.state.data} />;

	render() {
		if (this.state.data === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.data === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}
