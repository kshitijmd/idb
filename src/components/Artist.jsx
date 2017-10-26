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

const Spacer = () => <div style={{ paddingTop: "8px" }} />;

export default class Artist extends React.Component {
	state = {
		artist: undefined,
	};

	componentDidMount() {
		musicApi
			.getArtistDetails(this.props.match.params.artistId)
			.then(artist => {
				this.setState({
					artist: artist,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					artist: null,
				});
			});
	}

	_renderData = () => {
		const artist = this.state.artist;
		return (
			<Card style={styles.card}>
				<CardMedia overlay={<CardTitle title={artist.name} />}>
					<img src={artist.imageUrl} alt="" />
				</CardMedia>
				<CardTitle> Info </CardTitle>
				<CardText>
					<div>
						Bio: <p>{artist.bio}</p>
					</div>
					<Spacer />
					<div>Playcount: {artist.playcount}</div>
					<Spacer />
					<div>Genres: {artist.genres.map(genre => <p key={genre}>{genre}</p>)}</div>
					<Spacer />
					<div>Spotify URI: {artist.spotifyUri}</div>
					<Spacer />
					<div>Albums:</div>
					<ol>
						{artist.albums.map(album => (
							<li key={album.id}>
								<Link to={"/albums/" + album.id}>{album.name}</Link>
							</li>
						))}
					</ol>

					<Spacer />
					<div>Tracks:</div>
					<ol>
						{artist.tracks.map(track => (
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
		if (this.state.artist === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.artist === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}

Artist.propTypes = {
	match: PropTypes.object.isRequired,
};
