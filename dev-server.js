'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.development')
const compiler = webpack(webpackConfig)
const express = require('express')
const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  stats: { colors: true },
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(function (req, res, next) {
  if (!req.accepts('html')) return next()
  req.url = '/assets/index.html'
  app(req, res)
})

app.listen(8080, err => {
  if (err) throw err
  console.log('Server is now listening!')
})
