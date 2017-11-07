import React from "react";
import PropTypes from "prop-types";
import LinkButton from "./LinkButton";

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
		baseUrl: PropTypes.string.isRequired,
	};

	_renderNum(num) {
		return (
			<LinkButton
				key={num}
				to={`${this.props.baseUrl}?p=${num}`}
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
						<LinkButton to={`${this.props.baseUrl}?p=1`}>{"<< First"}</LinkButton>
						<LinkButton to={`${this.props.baseUrl}?p=${this.props.currentPage - 1}`}>
							{"< Prev"}
						</LinkButton>
					</div>
				) : null}
				{data}
				{this.props.currentPage < this.props.totalPages ? (
					<div style={styles.container}>
						<LinkButton to={`${this.props.baseUrl}?p=${this.props.currentPage + 1}`}>
							{"Next >"}
						</LinkButton>
						<LinkButton to={`${this.props.baseUrl}?p=${this.props.totalPages}`}>
							{"Last >>"}
						</LinkButton>
					</div>
				) : null}
			</div>
		);
	}
}
