import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
		</Switch>
	</main>
);

export default Main;
