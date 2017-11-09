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

export default class Track extends React.Component {
	state = {
		playlist: undefined,
	};

	componentDidMount() {
		musicApi
			.getTrackDetails(this.props.match.params.trackId)
			.then(track => {
				this.setState({
					track: track,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					track: null,
				});
			});
	}

	_renderData = () => {
		const track = this.state.track;
		return (
			<Card style={styles.card}>
				<CardMedia
					overlay={
						<CardTitle
							title={track.name}
							subtitle={
								<div>
									By{" "}
									<Link to={`/artists/${track.artist.id}`}>
										{track.artist.name}
									</Link>
								</div>
							}
						/>
					}
				>
					<img src={track.imageUrl} alt="" />
				</CardMedia>
				<CardTitle> Info </CardTitle>
				<CardText>
					<Spacer />
					<div>
						Featured on album:{" "}
						<Link to={`/albums/${track.album.id}`}>{track.album.name}</Link>
					</div>
					<Spacer />
					<iframe
						src={"https://open.spotify.com/embed?uri=" + track.spotifyUri}
						style={styles.embed}
					/>
					<Spacer />
					<div>Playcount: {track.playcount}</div>
					<Spacer />
					<div>Duration: {track.duration}</div>
					<Spacer />
					<div>Spotify URI: {track.spotifyUri}</div>
					<Spacer />
				</CardText>
			</Card>
		);
	};

	render() {
		if (this.state.track === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.track === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}

Track.propTypes = {
	match: PropTypes.object.isRequired,
};
