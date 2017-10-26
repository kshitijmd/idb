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
		loading: true,
		loaded: false,
		error: false,
		data: [],
	};

	componentDidMount() {
		musicApi
			.getAlbums()
			.then(data => {
				this.setState({
					loading: false,
					loaded: true,
					error: false,
					data: data.map(album => transformer(album)),
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					loading: false,
					loaded: false,
					error: true,
					data: [],
				});
			});
	}

	_renderData = () => <CardGridList routerBaseUrl="albums" data={this.state.data} />;

	_renderLoading = () => <ProgressSpinner />;

	_renderError = () => <ErrorCard />;

	render() {
		if (this.state.loading) {
			return this._renderLoading();
		} else if (this.state.error) {
			return this._renderError();
		} else {
			return this._renderData();
		}
	}
}
