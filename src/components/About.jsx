import React from "react";
import PageLayout from "./PageLayout";

const styles = {
	margin: "1em",
};

export default class About extends React.Component {
	render() {
		return (
			<PageLayout>
				<h1> About </h1>
				<div> Hello world </div>
			</PageLayout>
		);
	}
}
