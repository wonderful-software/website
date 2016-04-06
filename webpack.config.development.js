'use strict'

const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config')('development'), {
  devServer: {
    contentBase: __dirname + '/build',
    historyApiFallback: {
      index: '/assets/index.html'
    }
  },
  output: {
    filename: '[id]-[name].js'
  },
  devtool: 'cheap-eval-module-source-map'
})
