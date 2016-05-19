'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.development')
const compiler = webpack(webpackConfig)
const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')

app.use(history({
  index: '/assets/index.html'
}))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.listen(8080, err => {
  if (err) throw err
  console.log('Server is now listening!')
})
