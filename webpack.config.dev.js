'use strict'

var webpack = require('webpack')
var config = require('./webpack.config.base')

config.mode = 'development';

config.output.filename = 'app.js'

config.module.rules[0].use.options.presets.push('react-hmre')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin()
])

module.exports = config
