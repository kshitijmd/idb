import React from "react";
import Graph from "./Graph";

export default class Visualization extends React.Component {
	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Graph />
			</div>
		);
	}
}
