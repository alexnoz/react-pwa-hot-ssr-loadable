const webpack = require('webpack')
const merge = require('webpack-merge')
const ManifestPlugin = require('webpack-manifest-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.config')
const parts = require('./webpack.parts')
const paths = require('./paths')
const publicPath = baseConfig.output.publicPath

const isProd = process.env.NODE_ENV === 'production'

const productionConfig = merge(
  {
    entry: ['babel-polyfill', paths.entryClient],
    plugins: [
      new CleanPlugin([paths.build], {
        root: paths.root
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/sync/,
        './async'
      ),
      new ManifestPlugin({
        fileName: 'assets.json',
        publicPath
      }),
      new SWPrecachePlugin({
        // change it to your app's cache name
        cacheId: 'react-starter',
        dontCacheBustUrlsMatching: /./,
        minify: true,
        filename: 'sw.js',
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'networkFirst'
          }
        ]
      })
      // new BundleAnalyzerPlugin()
    ]
  },
  parts.extractBundles([
    {
      name: 'vendor',

      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
    },
    // should be the last definition
    {
      name: 'manifest',
      minChunks: Infinity
    }
  ])
)

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?noInfo=false&reload=true&overlay=true',
    paths.entryClient
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'app.js',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = isProd
  ? merge(baseConfig, productionConfig)
  : merge(baseConfig, developmentConfig)
