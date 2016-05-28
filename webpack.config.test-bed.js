'use strict'

const merge = require('webpack-merge')

module.exports = merge(require('./webpack.config')('development'), {
  entry: 'babel!./test-entry.js'
})
