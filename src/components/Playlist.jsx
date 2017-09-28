import React from "react";
import PageLayout from "./PageLayout";
import { Card, CardTitle, CardText, CardMedia } from "material-ui/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const playlists = [
	{
		id: 1,
		name: "The Pink Floyd Playlist",
		description: "Love Pink Floyd? Then this is the playlist for you!",
		imageUrls: {
			large: "http://images.genius.com/55237e8128c6cd7997c100e63f3ec2e1.1000x625x1.jpg",
		},
		followers: 2233366,
		spotifyUri: "spotify:user:spotify:playlist:37i9dQZF1DWUH2AzNQzWua",
		artist: "Pink Floyd",
		song: "Breathe (In the Air)",
		totalDuration: 169534,
		numSongs: 1,
		numArtists: 1,
	},
	{
		id: 2,
		name: "Interstellar Journey",
		description: "Music from the movie Interstellar, and more spacey tunes.",
		imageUrls: {
			large:
				"https://lh3.googleusercontent.com/K3UdS0t311DpKIiq614Ix6cRanFYxueEFaLF3T0bPQLGcJtqzw5ps3ClI85nK7jB4ElbKBs8xg=w640-h400-e365",
		},
		followers: 123456,
		spotifyUri: "spotify:user:spotify:playlist:95k9dQZF1ONBA2AzNQzZxy",
		artist: "Hans Zimmer",
		song: "Dust",
		totalDuration: 341000,
		numSongs: 1,
		numArtists: 1,
	},
	{
		id: 3,
		name: "Hymns for the Weekend",
		description: "The ultimate weekend playlist.",
		imageUrls: {
			large:
				"https://us.123rf.com/450wm/yanlev/yanlev1305/yanlev130500190/19773060-group-of-young-people-singing-into-microphone-at-party-karaoke.jpg?ver=6",
		},
		followers: 999999,
		spotifyUri: "spotify:user:spotify:playlist:81WnhYBAT1ONBA2AzNQopIA",
		artist: "Coldplay",
		song: "Hymn for the Weekend",
		totalLength: 258000,
		numSongs: 1,
		numArtists: 1,
	},
];

const styles = {
	card: {
		margin: "auto",
		height: "500px",
		width: "500px",
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
	render() {
		const playlist = playlists[this.props.match.params.playlistId - 1];
		return (
			<PageLayout>
				<div style={styles.card}>
					<Card>
						<CardMedia
							overlay={
								<CardTitle
									title={playlist.name}
									subtitle={<div>{playlist.description}</div>}
								/>
							}
						>
							<img src={playlist.imageUrls.large} alt="" />
						</CardMedia>
						<CardTitle> Info </CardTitle>
						<CardText>
							<Spacer />
							<div>Followers: {playlist.followers}</div>
							<Spacer />
							<div>Total Duration: {playlist.totalDuration}</div>
							<Spacer />
							<div>Number of Songs: {playlist.numSongs}</div>
							<Spacer />
							<div>Number of Artists: {playlist.numArtists}</div>
							<Spacer />
							<div>Spotify URI: {playlist.spotifyUri}</div>
							<Spacer />
							<div>
								Artists:
								<Link to={"/artists/" + playlist.id}>{playlist.artist}</Link>
							</div>
							<Spacer />
							<div>
								Songs:
								<Link to={"/tracks/" + playlist.id}>{playlist.song}</Link>
							</div>
						</CardText>
					</Card>
				</div>
			</PageLayout>
		);
	}
}

Playlist.propTypes = {
	match: PropTypes.object,
	"match.params": PropTypes.object,
	"match.params.playlistId": PropTypes.number,
};
