import React from "react";
import PropTypes from "prop-types";

const styles = {
	margin: "1em",
};

export default class PageLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div style={styles}>{this.props.children}</div>;
	}
}

PageLayout.propTypes = {
	children: PropTypes.node,
};
