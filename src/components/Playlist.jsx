import React from "react";
import { Card, CardTitle, CardText, CardMedia } from "material-ui/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as musicApi from "../services/api/musicApi";
import * as logger from "../services/logger";

const styles = {
	card: {
		margin: "auto",
		maxWidth: "500px",
	},
	link: {
		textDecoration: "none",
		color: "rgba(255, 255, 255, 0.87)",
	},
	embed: {
		width: "300",
		height: "380",
		frameborder: "0",
		allowtransparency: "true",
	},
};

const Spacer = () => <div style={{ paddingTop: "8px" }} />;

export default class Playlist extends React.Component {
	state = {
		playlist: undefined,
	};

	componentDidMount() {
		musicApi
			.getPlaylistDetails(this.props.match.playlistId)
			.then(playlist =>
				this.setState({
					playlist: playlist,
				})
			)
			.catch(err => {
				logger.error(err);
				this.setState({
					playlist: null,
				});
			});
	}

	_renderData = () => {
		const playlist = this.state.playlist;
		return (
			<Card style={styles.card}>
				<CardMedia overlay={<CardTitle title={playlist.name} />}>
					<img src={playlist.imageUrl} alt="" />
				</CardMedia>
				<CardTitle> Info </CardTitle>
				<CardText>
					<Spacer />
					<div>Followers: {playlist.numFollowers}</div>
					<Spacer />
					<div>Total Duration: {playlist.duration}</div>
					<Spacer />
					<div>Number of Tracks: {playlist.numTracks}</div>
					<Spacer />
					<div>Number of Artists: {playlist.numArtists}</div>
					<Spacer />
					<div>Spotify URI: {playlist.spotifyUri}</div>
					<Spacer />
					<div>Artists:</div>
					<ol>
						{playlist.artists.map(artist => (
							<li key={artist.id}>
								<Link to={"/artists/" + artist.id}>{artist.name}</Link>
							</li>
						))}
					</ol>
					<Spacer />
					<div>Tracks:</div>
					<ol>
						{playlist.tracks.map(track => (
							<li key={track.id}>
								<Link to={"/tracks/" + track.id}>{track.name}</Link>
							</li>
						))}
					</ol>
				</CardText>
			</Card>
		);
	};
	render() {
		if (this.state.playlist === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.playlist === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}

Playlist.propTypes = {
	match: PropTypes.object.isRequired,
};
