import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle, CardMedia } from "material-ui/Card";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import PaginationBar from "./PaginationBar";
import * as logger from "../services/logger";

const styles = {
	root: {
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

const PAGE = "p";
class CardGridList extends React.PureComponent {
	state = {
		data: undefined,
	};

	_onPageChange = newPage => {
		if (newPage < 1 || newPage > this.state.totalPages) {
			logger.error(`Attempted to switch to an invalid page ${newPage}`);
			return;
		}

		this.props.history.push({
			pathname: `${this.props.match.url}`,
			search: `?${PAGE}=${newPage}`,
		});
	};

	_getDataForPage = page => {
		this.props
			.modelApiFn(page)
			.then(response => {
				this.setState({
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
	};

	componentDidMount() {
		this._getDataForPage(1);
	}

	componentWillReceiveProps() {
		this.setState({
			data: undefined,
			currentPage: null,
			totalPages: null,
		});
		const qs = new URLSearchParams(location.search);
		const page = qs.get(PAGE) ? qs.get(PAGE) : 1;
		this._getDataForPage(page);
	}

	_renderData = () => (
		<div>
			<div style={styles.root}>
				{this.state.data.map(item => (
					<Link
						key={item.id}
						to={`${this.props.match.url}/${item.id}`}
						style={styles.hyperlink}
					>
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
			<div style={styles.footer}>
				<PaginationBar
					currentPage={this.state.currentPage}
					totalPages={this.state.totalPages}
					baseUrl={this.props.match.url}
				/>
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

CardGridList.propTypes = {
	modelApiFn: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(CardGridList);
