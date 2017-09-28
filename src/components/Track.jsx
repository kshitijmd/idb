import React from "react";
import PageLayout from "./PageLayout";
import { Card, CardTitle, CardText, CardMedia } from "material-ui/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const tracks = [
	{
		id: 1,
		name: "Breathe (In The Air)",
		imageUrls: {
			small: "https://i.scdn.co/image/c4bb8e18b0207c41d9fa1becd4fca1b6f68c06e6",
			large: "https://i.scdn.co/image/79b9f90d29978a2edd82c8cdbfd3f091207931c7",
		},
		duration: 169534,
		playcount: 1846426,
		spotifyUri: "spotify:track:2ctvdKmETyOzPb2GiJJT53",
		albums: "The Darkside of the Moon",
		artist: "Pink Floyd",
	},
	{
		id: 2,
		name: "Dust",
		imageUrls: {
			small: "https://i.scdn.co/image/398054462a0f56f58f05482b9beb3ebfb31cda15",
			large: "https://i.scdn.co/image/eed15df0d0849836293b9f787fabf077ce9e9f2e",
		},
		duration: 341000,
		playcount: 337458,
		spotifyUri: "spotify:track:6NNW7XLQ5BecXtPumwkPd5",
		albums: "Interstellar",
		artist: "Hans Zimmer",
	},
	{
		id: 3,
		name: "Hymn For the Weekend",
		imageUrls: {
			small: "https://i.scdn.co/image/6196f528b365e8ef504fd0706fb7e87adecfe647",
			large: "https://i.scdn.co/image/9c2c4a9ac9726bfd996ff96383178bbb5efc59ab",
		},
		duration: 258000,
		playcount: 1711993,
		spotifyUri: "spotify:track:3RiPr603aXAoi4GHyXx0uy",
		albums: "A Head Full of Dreams",
		artist: "Coldplay",
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

export default class Album extends React.Component {
	render() {
		const track = tracks[this.props.match.params.trackId - 1];
		return (
			<PageLayout>
				<div style={styles.card}>
					<Card>
						<CardMedia
							overlay={
								<CardTitle
									title={track.name}
									subtitle={
										<div>
											<Link to={"/albums/" + track.id} style={styles.link}>
												{`on ${track.albums}`}
											</Link>

											<Link to={"/artists/" + track.id} style={styles.link}>
												{` by ${track.artist}`}
											</Link>
										</div>
									}
								/>
							}
						>
							<img src={track.imageUrls.large} alt="" />
						</CardMedia>
						<CardTitle> Info </CardTitle>
						<CardText>
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
				</div>
			</PageLayout>
		);
	}
}

Album.propTypes = {
	match: PropTypes.object,
	"match.params": PropTypes.object,
	"match.params.trackId": PropTypes.number,
};
