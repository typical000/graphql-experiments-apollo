var fs = require('fs')
var path = require('path')

var configPath = path.join(process.cwd(), '.babelrc')
var config = JSON.parse(fs.readFileSync(configPath))

var webpackConfig = require('../webpack.config.base');
var aliases = webpackConfig.resolve ? webpackConfig.resolve.alias : {};

require('babel-register')(config)
require('ignore-styles')

var render = require('../src/server').default
var dir = path.join(__dirname, '..', 'dist');

try {
  fs.mkdirSync(dir)
} catch (err) {}

fs.writeFileSync(path.join(dir, 'index.html'), render)