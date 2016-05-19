'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const makeCssLoader = {
  prerender: (post, pre) => [ post, 'css/locals?modules&importLoaders=2', pre ].join('!'),
  production: (post, pre) => post + '!' + ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]の[local]／[hash:base64:7]&importLoaders=2!' + pre),
  development: (post, pre) => [ post, 'style!css?modules&localIdentName=[name]の[local]／[hash:base64:7]&importLoaders=2', pre ].join('!')
}

const makeGlobalCssLoader = {
  prerender: (post, pre) => [ post, 'css/locals', pre ].join('!'),
  production: (post, pre) => post + '!' + ExtractTextPlugin.extract('style', 'css!' + pre),
  development: (post, pre) => [ post, 'style!css', pre ].join('!')
}

const css = (loaders, env, options) => {
  const post = 'hyperstyles?h=react-hyperscript'
  const pre = [ 'postcss' ].concat(loaders).join('!')
  return (options.global ? makeGlobalCssLoader : makeCssLoader)[env](post, pre)
}

module.exports = env => {
  return {
    entry: {
      wonderfulsoftware: './src/index.js'
    },
    output: {
      path: __dirname + '/build/assets',
      filename: '[name]-[hash].js',
      publicPath: '/assets/'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html'
      })
    ],
    resolve: {
      alias: {
        site: __dirname + '/src/site'
      }
    },
    module: {
      loaders: [
        {
          include: __dirname + '/src',
          test: /\.js$/,
          loaders: [ 'babel' ]
        },
        {
          include: __dirname + '/src',
          test: /\.md$/,
          loaders: [ 'json', require.resolve('./src/markdown/markdown-loader') ]
        },
        {
          test: /\.styl$/,
          loader: css([ 'stylus' ], env, { global: false })
        },
        {
          test: /\.css$/,
          loader: css([ ], env, { global: true })
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          loaders: [
            { loader: 'url', query: { limit: 4096 } }
          ]
        },
        {
          test: /\.(eot|woff|woff2|ttf|otf)$/,
          loaders: [ 'file' ]
        }
      ]
    },
    postcss: function () {
      return [ require('autoprefixer') ]
    }
  }
}
