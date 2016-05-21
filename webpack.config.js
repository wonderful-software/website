'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CSS_LOADER_OPTIONS = 'modules&localIdentName=[name]の[local]／[hash:base64:7]&importLoaders=2'

const makeCssLoader = {
  prerender: (post, pre) => [ post, 'css/locals?' + CSS_LOADER_OPTIONS, pre ].join('!'),
  production: (post, pre) => post + '!' + ExtractTextPlugin.extract('style', 'css?' + CSS_LOADER_OPTIONS + '!' + pre),
  development: (post, pre) => [ post, 'style!css?' + CSS_LOADER_OPTIONS, pre ].join('!')
}

const makeGlobalCssLoader = {
  prerender: (post, pre) => [ 'css/locals', pre ].join('!'),
  production: (post, pre) => ExtractTextPlugin.extract('style', 'css!' + pre),
  development: (post, pre) => [ 'style!css', pre ].join('!')
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
      path: path.resolve(__dirname, 'build/assets'),
      filename: '[name]-[hash].js',
      publicPath: '/assets/'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      })
    ],
    resolve: {
      alias: {
        'ws': path.resolve(__dirname, 'src')
      }
    },
    resolveLoader: {
      alias: {
        'markdown-loader': require.resolve('./src/markdown/markdown-loader')
      }
    },
    module: {
      loaders: [
        {
          include: path.resolve(__dirname, 'src'),
          test: /\.js$/,
          loaders: [ 'babel' ]
        },
        {
          include: [
            require.resolve('highlight-with-codemirror/HTMLBuilder'),
            require.resolve('highlight-with-codemirror')
          ],
          loaders: [ 'babel' ]
        },
        {
          include: path.resolve(__dirname, 'src'),
          test: /\.md$/,
          loaders: [ 'json', 'markdown-loader' ]
        },
        {
          include: path.resolve(__dirname, 'src'),
          test: /\.yml$/,
          loaders: [ 'json', 'yaml' ]
        },
        {
          test: /\.styl$/,
          exclude: /\.global\.styl$/,
          loader: css([ 'stylus' ], env, { global: false })
        },
        {
          test: /\.css$/,
          loader: css([ ], env, { global: true })
        },
        {
          test: /\.global\.styl$/,
          loader: css([ 'stylus' ], env, { global: true })
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
