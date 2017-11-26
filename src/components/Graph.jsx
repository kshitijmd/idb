import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import data from "../../loldata.json";

const removeChars = str => str.replace(/[\s']|\(Quick Charge\)|\(Trinket\)/g, "");

export default class Graph extends React.Component {
	constructor(props) {
		super(props);

		this.simulation = d3
			.forceSimulation()
			.force(
				"link",
				d3
					.forceLink()
					.id(function(d) {
						return d.id;
					})
					.distance(400)
			)
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(props.width / 2, props.height / 2))
			.force("collide", d3.forceCollide(25));
	}

	componentDidMount() {
		this._createGraph();
	}

	componentDidUpdate() {
		this._createGraph();
	}

	render() {
		return (
			<svg
				width={this.props.width}
				height={this.props.height}
				ref={graph => (this.graph = graph)}
			/>
		);
	}

	_createGraph = () => {
		const graph = this.graph;
		const svg = d3.select(graph);

		const link = svg
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(data.links)
			.enter()
			.append("line")
			.style("stroke", "#aaa");

		const defs = svg.append("svg:defs");
		data.nodes.forEach(d => {
			defs
				.append("svg:pattern")
				.attr("id", removeChars(d.id))
				.attr("width", 1)
				.attr("height", 1)
				.append("svg:image")
				.attr("xlink:href", d.url)
				.attr("width", Math.max(d.count * 2, 40))
				.attr("height", Math.max(d.count * 2, 40))
				.attr("x", 0)
				.attr("y", 0);
		});

		const node = svg
			.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(data.nodes)
			.enter()
			.append("circle")
			.attr("r", d => Math.max(d.count, 20))
			// .style("pointer-events", "all")
			// .style("stroke", "none")
			// .style("stroke-width", "40px")
			.style("fill", d => `url(#${removeChars(d.id)})`)
			.call(
				d3
					.drag()
					.on("start", this._dragStarted)
					.on("drag", this._dragged)
					.on("end", this._dragEnded)
			);

		node.append("title").text(d => `${d.id}: ${d.count}`);

		const ticked = () => {
			link
				.attr("x1", function(d) {
					return d.source.x;
				})
				.attr("y1", function(d) {
					return d.source.y;
				})
				.attr("x2", function(d) {
					return d.target.x;
				})
				.attr("y2", function(d) {
					return d.target.y;
				});

			node
				.attr("cx", function(d) {
					return d.x;
				})
				.attr("cy", function(d) {
					return d.y;
				});
		};

		this.simulation.nodes(data.nodes).on("tick", ticked);
		this.simulation.force("link").links(data.links);
	};

	_dragStarted = d => {
		if (!d3.event.active) {
			this.simulation.alphaTarget(0.3).restart();
		}
		d.fx = d.x;
		d.fy = d.y;
	};

	_dragged = d => {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	};

	_dragEnded = d => {
		if (!d3.event.active) {
			this.simulation.alphaTarget(0);
		}
		d.fx = null;
		d.fy = null;
	};
}

Graph.defaultProps = {
	width: 1500,
	height: 800,
};

Graph.propTypes = {
	width: PropTypes.int,
	height: PropTypes.int,
};
