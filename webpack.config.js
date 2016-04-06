'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const makeCssLoader = {
  prerender: (post, pre) => [ post, 'css/locals?modules&importLoaders=2', pre ].join('!'),
  production: (post, pre) => post + '!' + ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!' + pre),
  development: (post, pre) => [ post, 'style!css?modules&importLoaders=2', pre ].join('!')
}

const css = (loaders, env) => {
  const post = 'hyperstyles?h=react-hyperscript'
  const pre = [ 'postcss' ].concat(loaders).join('!')
  return makeCssLoader[env](post, pre)
}

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      path: 'build/assets',
      filename: '[name]-[hash].js',
      publicPath: '/assets/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html'
      })
    ],
    resolve: {
      alias: {
        site: __dirname + '/src/site'
      },
    },
    module: {
      loaders: [
        {
          include: __dirname + '/src',
          test: /\.js$/,
          loaders: [ 'babel' ]
        },
        {
          test: /\.styl$/,
          loader: css([ 'stylus' ], env)
        },
        {
          test: /\.(gif|jpg|png)$/,
          loaders: [
            { loader: 'url', query: { limit: 8192 } }
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
