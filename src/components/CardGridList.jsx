import React from "react";
import { Link } from "react-router-dom";
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

export default class CardGridList extends React.PureComponent {
	state = {
		data: undefined,
	};

	_onPageChange = newPage => {
		if (newPage < 1 || newPage > this.state.totalPages) {
			logger.error(`Attempted to switch to an invalid page ${newPage}`);
			return;
		}

		this.props
			.modelApiFn(newPage)
			.then(response => {
				if (response.currentPage != newPage) {
					logger.warn(
						`Requested page ${newPage} but recieved page ${response.currentPage}`
					);
				}
				this.setState({
					currentPage: response.currentPage,
					totalPages: response.totalPages,
					data: response.data,
				});
			})
			.catch(err => {
				logger.error(err);
				this.setState({
					data: null,
				});
			});
	};

	componentDidMount() {
		this.props
			.modelApiFn()
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
					data: null,
				});
			});
	}

	_renderData = () => (
		<div>
			<div style={styles.root}>
				{this.state.data.map(item => (
					<Link
						key={item.id}
						to={`/${this.props.routerBaseUrl}/${item.id}`}
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
					onPageChange={this._onPageChange}
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
	routerBaseUrl: PropTypes.string.isRequired,
	modelApiFn: PropTypes.func.isRequired,
};
