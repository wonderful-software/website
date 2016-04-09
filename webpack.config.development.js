'use strict'

const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(require('./webpack.config')('development'), {
  entry: {
    wonderfulsoftware: [
      './src/index.js',
      'webpack-hot-middleware/client'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  output: {
    filename: '[id]-[name].js'
  },
  devtool: 'cheap-eval-module-source-map'
})
