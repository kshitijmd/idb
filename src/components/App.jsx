import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./Header";
import Main from "./Main";
import * as colors from "../constants/colors";

export default class App extends React.Component {
	componentDidMount() {
		document.body.style.backgroundColor = colors.lightGrey;
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Header />
					<Main />
				</div>
			</MuiThemeProvider>
		);
	}
}
