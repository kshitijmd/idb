import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardText, CardTitle } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ProgressSpinner from "./ProgressSpinner";
import ErrorCard from "./ErrorCard";
import EmptySearchCard from "./EmptySearchCard";
import PaginationBar from "./PaginationBar";
import * as logger from "../services/logger";
import * as searchParams from "../constants/searchParams";

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
	formInput: {
		marginLeft: "16px",
		marginBottom: "16px",
	},
	exclusionContainer: {
		marginLeft: "16px",
		marginBottom: "16px",
		display: "flex",
		alignItems: "center",
	},
	deleteExclusion: {
		color: "red",
	},
};

class CardGridList extends React.PureComponent {
	state = {
		data: undefined,
	};

	_getData = () => {
		this.props
			.modelApiFn(location.search)
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
		this._getData();
	}

	componentWillReceiveProps() {
		this.setState({
			data: undefined,
			currentPage: null,
			totalPages: null,
		});
		this._getData();
	}

	_renderControls = () => {
		const qs = new URLSearchParams(location.search);
		const activeOrderBy = qs.get(searchParams.ORDERBY);
		const currentlyDescending = qs.get(searchParams.DESC) === "true";
		const excludeVals = qs.get(searchParams.EXCLUDE)
			? qs.get(searchParams.EXCLUDE).split(",")
			: [];
		return (
			<Card>
				<CardTitle>Sort</CardTitle>
				<div style={styles.buttonRow}>
					<RaisedButton
						style={styles.button}
						onClick={() => {
							qs.set(searchParams.ORDERBY, searchParams.POP);
							if (
								activeOrderBy === searchParams.POP &&
								currentlyDescending !== null
							) {
								qs.set(searchParams.DESC, !currentlyDescending);
							} else {
								qs.set(searchParams.DESC, true);
							}
							this.props.history.push({
								pathname: location.pathname,
								search: qs.toString(),
							});
						}}
					>
						{activeOrderBy === searchParams.POP ? (
							currentlyDescending ? (
								<div>Popularity &uarr;</div>
							) : (
								<div>Popularity &darr;</div>
							)
						) : (
							"Popularity"
						)}
					</RaisedButton>
					<RaisedButton
						style={styles.button}
						onClick={() => {
							qs.set(searchParams.ORDERBY, searchParams.NAME);
							if (
								activeOrderBy === searchParams.NAME &&
								currentlyDescending !== null
							) {
								qs.set(searchParams.DESC, !currentlyDescending);
							} else {
								qs.set(searchParams.DESC, false);
							}
							this.props.history.push({
								pathname: location.pathname,
								search: qs.toString(),
							});
						}}
					>
						{activeOrderBy === searchParams.NAME ? (
							currentlyDescending ? (
								<div>Title &uarr;</div>
							) : (
								<div>Title &darr;</div>
							)
						) : (
							"Title"
						)}
					</RaisedButton>
				</div>

				<CardTitle>Exclude</CardTitle>
				<input
					style={styles.formInput}
					onKeyPress={update => {
						if (update.key === "Enter") {
							qs.set(searchParams.FILTERBY, searchParams.NAME);
							excludeVals.push(update.target.value);
							qs.set(searchParams.EXCLUDE, excludeVals);
							this.props.history.push({
								pathname: location.pathname,
								search: qs.toString(),
							});
							update.target.value = "";
						}
					}}
				/>
				{excludeVals.map(exclusion => (
					<div style={styles.exclusionContainer} key={exclusion}>
						<div>{exclusion}</div>
						<FlatButton
							style={styles.deleteExclusion}
							onClick={() => {
								const newExcludeVals = excludeVals.filter(ex => ex !== exclusion);
								qs.set(searchParams.EXCLUDE, newExcludeVals);
								this.props.history.push({
									pathname: location.pathname,
									search: qs.toString(),
								});
							}}
						>
							x
						</FlatButton>
					</div>
				))}
			</Card>
		);
	};

	_renderData = () => (
		<div>
			<div style={styles.cardsContainer}>
				{this.state.data.map(item => (
					<Link
						key={item.id}
						to={`${this.props.match.url}/${item.id}`}
						style={styles.hyperlink}
					>
						<Card style={styles.card}>
							<div style={styles.cardImgContainer}>
								{<img src={item.imageUrl} style={styles.cardImg} />}
							</div>
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
					location={this.props.history.location}
				/>
			</div>
		</div>
	);

	render() {
		if (this.state.data === undefined) {
			return (
				<div style={styles.container}>
					{this._renderControls()}
					<ProgressSpinner />
				</div>
			);
		} else if (this.state.data === null) {
			return <ErrorCard />;
		} else if (this.state.data.length === 0) {
			return (
				<div style={styles.container}>
					{this._renderControls()}
					<EmptySearchCard />
				</div>
			);
		} else {
			return (
				<div style={styles.container}>
					{this._renderControls()}
					{this._renderData()}
				</div>
			);
		}
	}
}

CardGridList.propTypes = {
	modelApiFn: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};

export default withRouter(CardGridList);
