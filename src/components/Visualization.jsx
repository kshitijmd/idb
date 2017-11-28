import React from "react";
import Graph from "./Graph";

export default class Visualization extends React.Component {
	render() {
		return (
			<div>
				<div
					style={{
						textAlign: "center",
					}}
				>
					<h1>League of Legends Items Co-occurence Graph</h1>
				</div>
				<div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
					<p>
						This graph represents the co-occurence graph of recommended items to build
						for every champion on the Summoner`s Rift map. {<br />} A link will occur
						between two items if they were recommended to be built together, while the
						size of the node represents how many champions were recommeneded to build
						that item
					</p>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderColor: "black",
						borderWidth: "2px",
						border: "solid",
						width: "95%",
						height: "80%",
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: "10px",
					}}
				>
					<Graph />
				</div>
			</div>
		);
	}
}
