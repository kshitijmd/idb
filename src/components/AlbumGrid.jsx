import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import GridCard from "./GridCard";
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

const albums = [
	{
		id: 1,
		name: "The Dark Side of the Moon",
		artists: [
			{
				id: 1,
				name: "Pink Floyd",
			},
		],
		genres: ["progressive rock"],
		imageUrls: {
			small: "https://i.scdn.co/image/c4bb8e18b0207c41d9fa1becd4fca1b6f68c06e6",
			large: "https://i.scdn.co/image/79b9f90d29978a2edd82c8cdbfd3f091207931c7",
		},
		releaseDate: "1973-03-01",
		playcount: "67392802",
		spotifyUri: "spotify:artist:0k17h0D3J5VfsdmQ1iZtE9",
	},
	{
		id: 2,
		name: "Interstellar",
		artists: [
			{
				id: 2,
				name: "Hans Zimmer",
			},
		],
		genres: ["soundtrack"],
		imageUrls: {
			small: "https://i.scdn.co/image/398054462a0f56f58f05482b9beb3ebfb31cda15",
			large: "https://i.scdn.co/image/eed15df0d0849836293b9f787fabf077ce9e9f2e",
		},
		releaseDate: "2014-11-21",
		playcount: "35284290",
		spotifyUri: "spotify:artist:0YC192cP3KPCRWx8zr8MfZ",
	},
	{
		id: 3,
		name: "A Head Full of Dreams",
		artists: [
			{
				id: 3,
				name: "Coldplay",
			},
		],
		genres: ["rock"],
		imageUrls: {
			small: "https://i.scdn.co/image/8a87ac474db652dd6cd9fb208be0f37a4ea9c36b",
			large: "https://i.scdn.co/image/9c2c4a9ac9726bfd996ff96383178bbb5efc59ab",
		},
		releaseDate: "2015-12-04",
		playcount: "12345678",
		spotifyUri: "spotify:artist:4gzpq5DPGxSnKTe4SA8HAU",
	},
];

export default class AlbumGrid extends React.Component {
	render() {
		return (
			<PageLayout>
				<div style={styles.root}>
					<GridList cellHeight={550} style={styles.gridList}>
						<Subheader>Albums</Subheader>
						{albums.map(album => (
							<Link key={album.id} to={"/albums/" + album.id} style={styles.link}>
								<GridTile>
									<GridCard
										imageSrc={album.imageUrls.large}
										title={album.name}
										subtitle={album.artists[0].name}
										bonusInfo1={`Released on ${album.releaseDate}`}
										bonusInfo2={`Played ${album.playcount} times`}
										bonusInfo3={`Spotify uri: ${album.spotifyUri}`}
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
