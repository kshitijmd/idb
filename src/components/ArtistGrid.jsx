import React from "react";
import CardGridList from "./CardGridList";
import ellipsize from "ellipsize";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as musicApi from "../services/api/musicApi";
import * as logger from "../services/logger";

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
	state = {
		data: undefined,
	};

	componentDidMount() {
		musicApi
			.getArtists()
			.then(data => {
				this.setState({
					data: data.map(artist => transformer(artist)),
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					data: null,
				});
			});
	}

	_renderData = () => <CardGridList routerBaseUrl="artists" data={this.state.data} />;

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
