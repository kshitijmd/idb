import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle } from "material-ui/Card";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import EmptySearchCard from "./EmptySearchCard";
import * as logger from "../services/logger";
import * as musicApi from "../services/api/musicApi";
import PaginationBar from "./PaginationBar";
import * as searchParams from "../constants/searchParams";
import Highlight from "react-highlight-words";

const styles = {
	container: {
		display: "flex",
	},
	cardsContainer: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	buttonRow: {
		display: "flex",
	},
	button: {
		marginLeft: "5px",
		marginRight: "5px",
	},
	hyperlink: {
		textDecoration: "none",
	},
	card: {
		maxWidth: "300px",
		marginBottom: "20px",
		marginLeft: "20px",
		marginRight: "20px",
	},
	footer: {
		display: "flex",
		justifyContent: "center",
	},
	cardImgContainer: {
		backgroundColor: "black",
		width: "100%",
		height: "300px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	cardImg: {
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
	},
};

class SearchCardList extends React.PureComponent {
	state = {
		data: undefined,
		qs: null,
	};

	_getDataForPage = page => {
		const qp = location.search;
		musicApi
			.searchModels(qp, page)
			.then(response => {
				this.setState({
					currentPage: response.currentPage,
					totalPages: response.totalPages,
					data: response.data,
					qs: qp,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					currentPage: null,
					totalPages: null,
					data: null,
					qs: null,
				});
			});
	};

	componentDidMount() {
		this._getDataForPage(1);
	}

	componentWillReceiveProps() {
		this.setState({
			data: undefined,
			currentPage: null,
			totalPages: null,
			qs: null,
		});
		const qs = new URLSearchParams(location.search);
		const page = qs.get(searchParams.PAGE) ? qs.get(searchParams.PAGE) : 1;
		this._getDataForPage(page);
	}

	_highlightText = text => {
		return (
			<Highlight
				searchWords={[new URLSearchParams(location.search).get("query")]}
				textToHighlight={text}
			/>
		);
	};

	_renderData = () => (
		<div style={styles.container}>
			<div>
				<div style={styles.cardsContainer}>
					{this.state.data.map(item => (
						<Link key={item.id} to={`${item.url}/${item.id}`} style={styles.hyperlink}>
							<Card style={styles.card}>
								<div style={styles.cardImgContainer}>
									{<img src={item.imageUrl} style={styles.cardImg} />}
								</div>
								<CardTitle
									title={this._highlightText(item.title)}
									subtitle={this._highlightText(item.subtitle)}
								/>
								{/*<CardTitle title={<div style={{backgroundColor: "green"}}>{item.title}</div>} subtitle={item.subtitle} />*/}
								<CardText>
									<ol>
										<li>{this._highlightText(item.bonusInfo1)}</li>
										<li>{this._highlightText(item.bonusInfo2)}</li>
										<li>{this._highlightText(item.bonusInfo3)}</li>
									</ol>
								</CardText>
							</Card>
						</Link>
					))}
				</div>
				<div style={styles.footer}>
					<PaginationBar
						currentPage={this.state.currentPage}
						totalPages={this.state.totalPages}
						location={this.props.history.location}
					/>
				</div>
			</div>
		</div>
	);

	highlightText(text, qs) {
		logger.log("QS is " + qs);
		return <div style={{ backgroundColor: "green" }}>{text}</div>;
	}

	render() {
		if (this.state.data === undefined) {
			return <ProgressSpinner />;
		} else if (this.state.data === null) {
			return <ErrorCard />;
		} else if (this.state.data.length === 0) {
			return <EmptySearchCard />;
		} else {
			return this._renderData();
		}
	}
}

SearchCardList.propTypes = {
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(SearchCardList);
