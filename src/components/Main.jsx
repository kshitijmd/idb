import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AlbumGrid from "./AlbumGrid";
import ArtistGrid from "./ArtistGrid";
import TrackGrid from "./TrackGrid";
import PlaylistGrid from "./PlaylistGrid";
import Album from "./Album";
import Artist from "./Artist";
import Track from "./Track";
import Playlist from "./Playlist";

const Main = () => (
	<main style={{ margin: "1em" }}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/albums" component={AlbumGrid} />
			<Route exact path="/albums/:albumId" component={Album} />
			<Route exact path="/artists" component={ArtistGrid} />
			<Route exact path="/artists/:artistId" component={Artist} />
			<Route exact path="/tracks" component={TrackGrid} />
			<Route exact path="/tracks/:trackId" component={Track} />
			<Route exact path="/playlists/" component={PlaylistGrid} />
			<Route exact path="/playlists/:playlistId" component={Playlist} />
		</Switch>
	</main>
);

export default Main;
