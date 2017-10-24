import React from "react";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, CardMedia } from "material-ui/Card";

const styles = {
	text: {
		textDecoration: "none",
	},
};

export default class GridCard extends React.PureComponent {
	render() {
		return (
			<Card>
				<CardMedia>
					<img src={this.props.imageSrc} />
				</CardMedia>
				<CardTitle
					title={this.props.title}
					titleStyle={styles.text}
					subtitle={this.props.subtitle}
				/>
				<CardText style={styles.text}>
					<ul>
						<li>{this.props.bonusInfo1}</li>
						<li>{this.props.bonusInfo2}</li>
					</ul>
				</CardText>
			</Card>
		);
	}
}

GridCard.propTypes = {
	imageSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,

	// Required so there are 5 attributes per model
	bonusInfo1: PropTypes.string.isRequired,
	bonusInfo2: PropTypes.string.isRequired,
};
