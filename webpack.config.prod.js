'use strict'

var CompressionPlugin = require('compression-webpack-plugin')
var webpack = require('webpack')

var config = require('./webpack.config.base')

config.output.filename = 'app.[chunkhash].js',

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    filename: '[name].[chunkhash].js'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
  new webpack.optimize.UglifyJsPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
])

module.exports = config
