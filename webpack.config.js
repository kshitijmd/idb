var webpack = require('webpack')
module.exports = {
  entry: [
    './js/app.jsx'
  ],
  output: {
    path: __dirname + '/static',
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
