const webpack = require("webpack");

module.exports = {
	entry: ["./src/index.jsx"],

	output: {
		path: __dirname + "/build/dist/",
		filename: "bundle.js",
	},

	resolve: {
		extensions: ["", ".js", ".jsx"],
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				query: {
					presets: ["env", "react", "stage-1"],
				},
				exclude: /node_modules/,
			},
			{ test: /\.json$/, loader: "json" },
		],
	},
	plugins: [],
	devtool: "source-map",

	externals: [
		{
			xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}",
		},
	],
};
