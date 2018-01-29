'use strict'

var webpack = require('webpack')
var config = require('./webpack.config.base')

config.output.filename = 'app.js'

config.module.rules[0].use.options.presets.push('react-hmre')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    filename: '[name].js'
  }),
  new webpack.HotModuleReplacementPlugin()
])

module.exports = config
