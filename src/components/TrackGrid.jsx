import React from "react";
import PageLayout from "./PageLayout";
import CardGridList from "./CardGridList";

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
	{
		id: 4,
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
	{
		id: 5,
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
	{
		id: 6,
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
	{
		id: 7,
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
	{
		id: 8,
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
	_transformer = track => ({
		id: track.id,
		imageUrl: track.imageUrls.large,
		title: track.name,
		subtitle: `By ${track.artist}`,
		bonusInfo1: `Featured on album ${track.albums}`,
		bonusInfo2: `${track.duration} seconds long`,
		bonusInfo3: `Played ${track.playcount} times`,
	});

	render() {
		return (
			<PageLayout>
				<CardGridList
					routerBaseUrl={"tracks"}
					data={tracks.map(track => this._transformer(track))}
				/>
			</PageLayout>
		);
	}
}
