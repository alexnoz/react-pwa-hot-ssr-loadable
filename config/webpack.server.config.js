const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.base.config')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  target: 'node',
  // devtool: '#source-map',
  entry: paths.entryServer,
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  })
})
