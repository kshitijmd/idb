import React from "react";
import PropTypes from "prop-types";
import LinkButton from "./LinkButton";
import * as searchParams from "../constants/searchParams";

const styles = {
	container: {
		display: "flex",
		justifyContent: "flex-start",
	},
};

export default class PaginationBar extends React.PureComponent {
	static propTypes = {
		currentPage: PropTypes.number.isRequired,
		totalPages: PropTypes.number.isRequired,

		// Required to avoid clobbering searchParams
		location: PropTypes.object.isRequired,
	};

	/* Sets the new page without overwriting any of the existing searchParams */
	_getNewPageLink = pageNum => {
		const qs = new URLSearchParams(this.props.location.search);
		qs.set(searchParams.PAGE, pageNum);
		return {
			pathname: this.props.location.pathname,
			search: qs.toString(),
		};
	};

	_renderNum(num) {
		return (
			<LinkButton
				key={num}
				to={this._getNewPageLink(num)}
				disabled={this.props.currentPage == num}
			>
				{num}
			</LinkButton>
		);
	}

	render() {
		const data = [];
		const start = Math.max(1, this.props.currentPage - 2);
		for (let i = 0; i < 5 && i + start <= this.props.totalPages; i++) {
			data.push(this._renderNum(start + i));
		}
		return (
			<div style={styles.container}>
				{this.props.currentPage > 1 ? (
					<div style={styles.container}>
						<LinkButton to={this._getNewPageLink(1)}>{"<< First"}</LinkButton>
						<LinkButton to={this._getNewPageLink(this.props.currentPage - 1)}>
							{"< Prev"}
						</LinkButton>
					</div>
				) : null}
				{data}
				{this.props.currentPage < this.props.totalPages ? (
					<div style={styles.container}>
						<LinkButton to={this._getNewPageLink(this.props.currentPage + 1)}>
							{"Next >"}
						</LinkButton>
						<LinkButton to={this._getNewPageLink(this.props.totalPages)}>
							{"Last >>"}
						</LinkButton>
					</div>
				) : null}
			</div>
		);
	}
}
