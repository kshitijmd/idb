import React from "react";
import Graph from "./Graph";

const nodeCount = 100;
const nodes = [];
for (let i = 0; i < nodeCount; i++) {
	nodes.push({
		r: Math.random() * 5 + 2,
		x: 0,
		y: 0,
	});
}

const links = [];
for (let i = 0; i < nodeCount; i++) {
	let tgt = 0;
	do {
		tgt = Math.floor(Math.random() * nodeCount);
	} while (tgt == i);
	links.push({
		source: i,
		target: tgt,
	});
}

export default class Visualization extends React.Component {
	render() {
		return (
			<div>
				<Graph nodes={nodes} links={links} />
			</div>
		);
	}
}
