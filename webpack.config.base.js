'use strict'

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyFilesPlugin = require('copy-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')

var dependencies = require('./package.json').dependencies

module.exports = {
  entry: {
    app: [path.join(__dirname, 'src', 'client.js')],
    vendor: Object.keys(dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist'
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: []
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.jpg$/, use: 'url-loader?limit=100000' },
      { test: /\.png$/, use: 'url-loader?limit=100000' },
      { test: /\.gif$/, use: 'url-loader?limit=100000' },
      { test: /\.jpg$/, use: 'file-loader' },
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })}
    ]
  },
  plugins: [
    new CopyFilesPlugin([{
      from: './src/images',
      to: './images'
    }]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new ExtractTextPlugin('vendor.css'),
    new ManifestPlugin({
      fileName: 'stats.json',
      // Exclude sourcemaps
      filter: ({name}) => {
        if (name.endsWith('map') || name.endsWith('css')) return false
        return true
      }
    }),
  ]
}
