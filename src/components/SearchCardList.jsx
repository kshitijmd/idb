import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, CardMedia } from "material-ui/Card";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import * as logger from "../services/logger";
import * as musicApi from "../services/api/musicApi";

const styles = {
	container: {
		display: "flex",
	},
	cardsContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	hyperlink: {
		textDecoration: "none",
	},
	card: {
		maxWidth: "400px",
		marginBottom: "20px",
		marginLeft: "20px",
		marginRight: "20px",
	},
	footer: {
		display: "flex",
		justifyContent: "center",
	},
};

class SearchCardList extends React.PureComponent {
	state = {
		data: undefined,
	};

	_getDataForPage = () => {
		const qp = location.search;
		musicApi
			.searchModels(qp)
			.then(response => {
				this.setState({
					// TODO: implement pagination so these two aren't undefined
					currentPage: response.currentPage,
					totalPages: response.totalPages,
					data: response.data,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					currentPage: null,
					totalPages: null,
					data: null,
				});
			});
		logger.log("Value " + qp);
	};

	// At the moment, pagination doesn't work.
	componentDidMount() {
		this._getDataForPage();
	}

	//needed for pagination
	componentWillReceiveProps() {
		this.setState({
			data: undefined,
			currentPage: null,
			totalPages: null,
		});
		//const qs = new URLSearchParams(this.props.location.search);
		//const page = qs.get(searchParams.PAGE) ? qs.get(searchParams.PAGE) : 1;
		this._getDataForPage();
	}

	_renderData = () => (
		<div style={styles.container}>
			
			<div>
				<div style={styles.cardsContainer}>
					{this.state.data.map(item => (
						<Link
							key={item.id}
							to={`${item.url}/${item.id}`}
							style={styles.hyperlink}
						>
							<Card style={styles.card}>
								<CardMedia>
									<img src={item.imageUrl} />
								</CardMedia>
								{/*<CardTitle title={item.title} subtitle={item.subtitle} /> */}

								<CardTitle title={<div style={{backgroundColor: "green"}}>{item.title}</div>} subtitle={item.subtitle} />
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
				<div style={styles.footer}>
					{/*TODO: Add backend pagination. Commented out for safety
					<PaginationBar
						currentPage={this.state.currentPage}
						totalPages={this.state.totalPages}
						location={this.props.history.location}
					/>*/}
				</div>
			</div>
		</div>
	);

	render() {
		if (this.state.data === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.data === null) {
			return <ErrorCard />;
		} else {
			return this._renderData();
		}
	}
}

SearchCardList.propTypes = {
	//modelApiFn: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(SearchCardList);
