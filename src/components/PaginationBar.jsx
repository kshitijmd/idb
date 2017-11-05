import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

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
		onPageChange: PropTypes.func.isRequired,
	};

	_renderNum(num) {
		return (
			<FlatButton
				key={num}
				disabled={num == this.props.currentPage}
				onClick={() => this.props.onPageChange(num)}
			>
				{num}
			</FlatButton>
		);
	}

	render() {
		const data = Array.from(Array(this.props.totalPages).keys()).map(num =>
			this._renderNum(num + 1)
		);
		return (
			<div style={styles.container}>
				{this.props.currentPage > 1 ? (
					<div>
						<FlatButton onClick={() => this.props.onPageChange(1)}>
							{"<< First"}
						</FlatButton>
						<FlatButton
							onClick={() => this.props.onPageChange(this.props.currentPage - 1)}
						>
							{"< Prev"}
						</FlatButton>
					</div>
				) : null}
				{data}
				{this.props.currentPage < this.props.totalPages ? (
					<div>
						<FlatButton
							onClick={() => this.props.onPageChange(this.props.currentPage + 1)}
						>
							{"Next >"}
						</FlatButton>
						<FlatButton onClick={() => this.props.onPageChange(this.props.totalPages)}>
							{"Last >>"}
						</FlatButton>
					</div>
				) : null}
			</div>
		);
	}
}
