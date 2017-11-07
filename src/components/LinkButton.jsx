import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as colors from "../constants/colors";

const styles = {
	button: {
		paddingTop: "10px",
		paddingBottom: "10px",
		paddingLeft: "20px",
		paddingRight: "20px",
		backgroundColor: "white",
		borderWidth: "1px",
		borderRadius: "3px",
		borderStyle: "solid",
		borderColor: colors.lightGrey,
	},
};

export default class LinkButton extends React.PureComponent {
	static propTypes = {
		to: PropTypes.string.isRequired,
		children: PropTypes.node.isRequired,
		disabled: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		disabled: false,
	};

	_renderButton = () => {
		return <div style={styles.button}>{this.props.children}</div>;
	};

	render() {
		return this.props.disabled ? (
			this._renderButton()
		) : (
			<Link to={this.props.to}>{this._renderButton()}</Link>
		);
	}
}
