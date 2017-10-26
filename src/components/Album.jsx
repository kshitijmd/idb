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
};

export default class Album extends React.Component {
	state = {
		album: undefined,
	};

	componentDidMount() {
		musicApi
			.getAlbumDetails(this.props.match.params.albumId)
			.then(album => {
				this.setState({
					album: album,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					album: null,
				});
			});
	}

	_renderData = () => (
		<Card style={styles.card}>
			<CardMedia
				overlay={
					<CardTitle
						title={this.state.album.name}
						subtitle={
							<Link to={"/artists/" + this.state.album.artist.id} style={styles.link}>
								{`by ${this.state.album.artist.name}`}
							</Link>
						}
					/>
				}
			>
				<img src={this.state.album.imageUrl} />
			</CardMedia>
			<CardTitle> Info </CardTitle>
			<CardText>
				<div>Tracks:</div>
				<ol>
					{this.state.album.tracks.map(track => (
						<li key={track.id}>
							<Link to={"/tracks/" + track.id}>{track.name}</Link>
						</li>
					))}
				</ol>
				<div>Release date: {this.state.album.releaseDate}</div>
				<div>Playcount: {this.state.album.playcount}</div>
				<div>
					Genres: {this.state.album.genres.map(genre => <p key={genre}>{genre}</p>)}
				</div>
				<div>Spotify URI: {this.state.album.spotifyUri}</div>
			</CardText>
		</Card>
	);

	render() {
		if (this.state.album === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.album === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}

Album.propTypes = {
	match: PropTypes.object.isRequired,
};
