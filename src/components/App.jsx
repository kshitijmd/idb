import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { grey800 } from "material-ui/styles/colors";
import Header from "./Header";
import Main from "./Main";
import * as colors from "../constants/colors";

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: grey800,
		accent1Color: "#1ed760", // definitely not spotify green
	},
});

export default class App extends React.Component {
	componentDidMount() {
		document.body.style.backgroundColor = colors.lightGrey;
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<Header />
					<Main />
				</div>
			</MuiThemeProvider>
		);
	}
}
