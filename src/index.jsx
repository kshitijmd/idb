import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StyleRoot } from "radium";
import App from "./components/App";

render(
	<StyleRoot>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StyleRoot>,
	document.getElementById("root")
);
