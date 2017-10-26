import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, CardMedia } from "material-ui/Card";

const styles = {
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	card: {
		maxWidth: "400px",
		marginBottom: "20px",
		marginLeft: "20px",
		marginRight: "20px",
	},
};

/* TODO: Remove underlining of hyperlinks */
export default class CardGridList extends React.PureComponent {
	render() {
		return (
			<div style={styles.root}>
				{this.props.data.map(item => (
					<Link key={item.id} to={`/${this.props.routerBaseUrl}/${item.id}`}>
						<Card style={styles.card}>
							<CardMedia>
								<img src={item.imageUrl} />
							</CardMedia>
							<CardTitle title={item.title} subtitle={item.subtitle} />
							<CardText>
								<ol>
									<li>{item.bonusInfo1}</li>
									<li>{item.bonusInfo2}</li>
									<li>{item.bonusInfo3}</li>
								</ol>
							</CardText>
						</Card>
					</Link>
				))}
			</div>
		);
	}
}

CardGridList.propTypes = {
	routerBaseUrl: PropTypes.string.isRequired,

	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			imageUrl: PropTypes.string.isRequired,

			title: PropTypes.string.isRequired,
			subtitle: PropTypes.string.isRequired,

			// Required so there are 5 attributes per model
			bonusInfo1: PropTypes.string.isRequired,
			bonusInfo2: PropTypes.string.isRequired,
			bonusInfo3: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
};
