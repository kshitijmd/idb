const webpack = require('webpack')

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/static/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
  ]
}
