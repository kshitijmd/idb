import React from "react";
import PageLayout from "./PageLayout";
import CardGridList from "./CardGridList";
import ellipsize from "ellipsize";

const artists = [
	{
		id: 1,
		name: "Pink Floyd",
		genres: ["progressive rock"],
		imageUrls: {
			small: "https://i.scdn.co/image/f0a39a8a196a87a7236bdcf8a8708f6d5d3547cc",
			large: "https://i.scdn.co/image/e69f71e2be4b67b82af90fb8e9d805715e0684fa",
		},
		bio:
			"Pink Floyd are a psychedelic/progressive rock band formed in Cambridge, England, United Kingdom in 1965. Pink Floyd is one of rock's most successful and influential acts, having sold over 200 million albums worldwide and with 74.5 million certified units in the United States, making them one of the best-selling artists of all time. Currently the band consists of David Gilmour (vocals, guitar) and Nick Mason (drums).",
		playcount: "293797898",
		spotifyUri: "spotify:artist:0k17h0D3J5VfsdmQ1iZtE9",
	},
	{
		id: 2,
		name: "Hans Zimmer",
		genres: ["soundtrack"],
		imageUrls: {
			small: "https://i.scdn.co/image/5d00f15e7213ffca8c1b81d8e9eb60c4a327f8e2",
			large: "https://i.scdn.co/image/3a239a65a8f21722b9281934d023d0a9686f499f",
		},
		bio:
			"Hans Florian Zimmer (born September 12, 1957) is a German film composer and music producer, born in Frankfurt am Main, Germany and active since 1977. Having won a wide variety of honors and commendations, he has composed music for over 100 films, including award-winning films and box-office hits such as Rain Man (1988), Driving Miss Daisy (1989), Thelma & Louise (1991), The Lion King (1994), Crimson Tide (1995), Gladiator (2000), The Last Samurai (2003), The Dark Knight (2008), Inception (2010), 12 Years a Slave (2013) and Interstellar (2014).",
		playcount: "66385685",
		spotifyUri: "spotify:artist:7zui3xf9jZj7X6yWl3nxaa",
	},
	{
		id: 3,
		name: "Coldplay",
		genres: ["rock"],
		imageUrls: {
			small: "https://i.scdn.co/image/02c781539fca2176059bdeafd9fa903db5b9a4d0",
			large: "https://i.scdn.co/image/143b0f286f76ece3a711f673d9ba00b8f499b2c0",
		},
		bio:
			"Coldplay is a British alternative rock band, formed in London, United Kingdom in 1997. The band comprises vocalist and pianist Chris Martin, lead guitarist Jonny Buckland – who met each other in September 1996 at Ramsay Hall (halls of residence) at University College London - bassist Guy Berryman and drummer Will Champion.\n\nNot only have Coldplay had 7 highly successful studio album releases (all of which reached #1 on the UK album chart) - with their latest 7th studio album released on December 4",
		playcount: "345788551",
		spotifyUri: "spotify:artist:4dN093YINZ9EVp4hajmQQr",
	},
];

export default class ArtistGrid extends React.Component {
	_transformer = artist => ({
		id: artist.id,
		imageUrl: artist.imageUrls.large,
		title: artist.name,
		subtitle: `Genre: ${artist.genres[0]}`,
		bonusInfo1: `Played ${artist.playcount} times`,
		bonusInfo2: `Spotify uri: ${artist.spotifyUri}`,
		bonusInfo3: `Bio: ${ellipsize(artist.bio, 100)}`,
	});

	render() {
		return (
			<PageLayout>
				<CardGridList
					routerBaseUrl="artists"
					data={artists.map(artist => this._transformer(artist))}
				/>
			</PageLayout>
		);
	}
}
