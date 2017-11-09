import React from "react";
import CircularProgress from "material-ui/CircularProgress";

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
	},
};

export default class ProgressSpinner extends React.PureComponent {
	render() {
		return (
			<div style={styles.container}>
				<CircularProgress size={75} thickness={5} />
			</div>
		);
	}
}
