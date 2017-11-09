import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
	},
	card: {
		maxWidth: "400px",
	},
};

export default class ErrorCard extends React.PureComponent {
	render() {
		return (
			<div style={styles.container}>
				<Card style={styles.card}>
					<CardTitle title={"Error"} />
					<CardText>
						We were unable to retrieve the data associated with this endpoint.
					</CardText>
				</Card>
			</div>
		);
	}
}
