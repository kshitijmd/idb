import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import CardGridList from "./CardGridList";
import SearchCardList from "./SearchCardList";
import Album from "./Album";
import Artist from "./Artist";
import Track from "./Track";
import Playlist from "./Playlist";
import * as musicApi from "../services/api/musicApi";

const Main = () => (
	/* NOTE: Keys required to allow component dismount & remount */
	<main style={{ margin: "1em" }}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route
				exact
				path="/albums"
				key={"albums"}
				render={({ props }) => <CardGridList {...props} modelApiFn={musicApi.getAlbums} />}
			/>
			<Route exact path="/albums/:albumId" component={Album} />
			<Route
				exact
				path="/artists"
				key={"artists"}
				render={({ props }) => <CardGridList {...props} modelApiFn={musicApi.getArtists} />}
			/>
			<Route exact path="/artists/:artistId" component={Artist} />
			<Route
				exact
				path="/tracks"
				key={"tracks"}
				render={({ props }) => <CardGridList {...props} modelApiFn={musicApi.getTracks} />}
			/>
			<Route exact path="/tracks/:trackId" component={Track} />
			<Route
				exact
				path="/playlists/"
				key={"playlists"}
				render={({ props }) => (
					<CardGridList {...props} modelApiFn={musicApi.getPlaylists} />
				)}
			/>
			<Route exact path="/playlists/:playlistId" component={Playlist} />
			<Route
				exact
				path="/search"
				key={"Search"}
				render={({ props }) => <SearchCardList {...props} />}
			/>
		</Switch>
	</main>
);

export default Main;
