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

export default class EmptySearchCard extends React.PureComponent {
	render() {
		return (
			<div style={styles.container}>
				<Card style={styles.card}>
					<CardTitle title={"No Results"} />
					<CardText>
						We were unable to find any models matching this search query.
					</CardText>
				</Card>
			</div>
		);
	}
}
