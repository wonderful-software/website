'use strict'

const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config')('prerender'), {
  entry: './src/prerenderer',
  target: 'node',
  output: {
    path: __dirname + '/build/prerenderer',
    filename: 'prerenderer.js',
    library: 'prerenderer',
    libraryTarget: 'umd'
  }
})
