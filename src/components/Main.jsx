import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AlbumGrid from "./AlbumGrid";
import Album from "./Album";

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/albums" component={AlbumGrid} />
			<Route exact path="/albums/:albumId" component={Album} />
		</Switch>
	</main>
);

export default Main;
