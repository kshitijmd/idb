import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from "material-ui/Subheader";

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
	gridList: {
		width: 750,
		height: 750,
		overflowY: "auto",
	},
	link: {
		textDecoration: "none",
		color: "rgb(255, 255, 255)",
	},
};

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
		totalDuation: 258000,
		numSongs: 1,
		numArtists: 1,
	},
];

export default class PlaylistGrid extends React.Component {
	render() {
		return (
			<PageLayout>
				<div style={styles.root}>
					<GridList cellHeight={300} style={styles.gridList}>
						<Subheader>Playlists</Subheader>
						{playlists.map(playlist => (
							<Link key={playlist.id} to={"/playlists/" + playlist.id}>
								<GridTile
									title={playlist.name}
									subtitle={"Duration: " + playlist.totalDuration}
								>
									<img src={playlist.imageUrls.large} />
								</GridTile>
							</Link>
						))}
					</GridList>
				</div>
			</PageLayout>
		);
	}
}
