import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

export default class Graph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nodes: props.nodes,
			links: props.links,
		};
	}

	componentDidMount() {
		this.simulation = d3
			.forceSimulation(this.state.nodes)
			.force("charge", d3.forceManyBody().strength(this.props.forceStrength))
			.force(
				"link",
				d3
					.forceLink()
					.distance(this.props.linkDistance)
					.links(this.state.links)
			)
			.force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2));

		this.simulation.on("tick", () =>
			this.setState({
				links: this.state.links,
				nodes: this.state.nodes,
			})
		);
	}

	componentWillUnmount() {
		this.simulation.stop();
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				{this.state.links.map((link, index) => (
					<line
						x1={link.source.x}
						y1={link.source.y}
						x2={link.target.x}
						y2={link.target.y}
						key={`line-${index}`}
						stroke="black"
					/>
				))}
				{this.state.nodes.map((node, index) => (
					<circle r={node.r} cx={node.x} cy={node.y} fill="red" key={index} />
				))}
			</svg>
		);
	}
}

Graph.defaultProps = {
	width: 980,
	height: 720,
	linkDistance: 30,
	forceStrength: -20,
};
