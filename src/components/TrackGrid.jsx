import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import { GridList, GridTile } from "material-ui/GridList";
import Subheader from "material-ui/Subheader";
import GridCard from "./GridCard";

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

const tracks = [
	{
		id: 1,
		name: "Breathe (In The Air)",
		imageUrls: {
			small: "https://i.scdn.co/image/c4bb8e18b0207c41d9fa1becd4fca1b6f68c06e6",
			large: "https://i.scdn.co/image/79b9f90d29978a2edd82c8cdbfd3f091207931c7",
		},
		duration: 169,
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
		duration: 341,
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
		duration: 258,
		playcount: 1711993,
		spotifyUri: "spotify:track:3RiPr603aXAoi4GHyXx0uy",
		albums: "A Head Full of Dreams",
		artist: "Coldplay",
	},
];

export default class TrackGrid extends React.Component {
	render() {
		return (
			<PageLayout>
				<div style={styles.root}>
					<GridList cellHeight={550} style={styles.gridList}>
						<Subheader>Tracks</Subheader>
						{tracks.map(track => (
							<Link key={track.id} to={"/tracks/" + track.id} style={styles.link}>
								<GridTile>
									<GridCard
										imageSrc={track.imageUrls.large}
										title={track.name}
										subtitle={`By ${track.artist}`}
										bonusInfo1={`Played ${track.playcount} times`}
										bonusInfo2={`Duration: ${track.duration}`}
										bonusInfo3={`Spotify uri: ${track.spotifyUri}`}
									/>
								</GridTile>
							</Link>
						))}
					</GridList>
				</div>
			</PageLayout>
		);
	}
}
