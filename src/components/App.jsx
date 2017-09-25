import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./Header";
import Main from "./Main";

const App = () => (
	<MuiThemeProvider>
		<div>
			<Header />
			<Main />
		</div>
	</MuiThemeProvider>
);

export default App;
