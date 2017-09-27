import React from "react";

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
