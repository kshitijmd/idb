import React from "react";
import CardGridList from "./CardGridList";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as musicApi from "../services/api/musicApi";
import * as logger from "../services/logger";

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
	state = {
		data: undefined,
	};

	componentDidMount() {
		musicApi
			.getTracks()
			.then(data => {
				this.setState({
					data: data.map(track => transformer(track)),
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					data: null,
				});
			});
	}

	_renderData = () => <CardGridList routerBaseUrl="tracks" data={this.state.data} />;

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
