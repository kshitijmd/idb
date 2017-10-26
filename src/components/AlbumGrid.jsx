import React from "react";
import CardGridList from "./CardGridList";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as musicApi from "../services/api/musicApi";
import * as logger from "../services/logger";

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
	state = {
		data: undefined,
	};

	componentDidMount() {
		musicApi
			.getAlbums()
			.then(data => {
				this.setState({
					data: data.map(album => transformer(album)),
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					data: null,
				});
			});
	}

	_renderData = () => <CardGridList routerBaseUrl="albums" data={this.state.data} />;

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
