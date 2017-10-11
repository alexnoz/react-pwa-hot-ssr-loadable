const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const parts = require('./webpack.parts')
const paths = require('./paths')

const lintJSOptions = {
  emitWarning: true,

  // Fail only on errors
  failOnWarning: false,
  failOnError: true,

  // Toggle autofix
  fix: true,

  formatter: require('eslint-friendly-formatter')
}

const cssPreprocessorLoader = { loader: 'fast-sass-loader' }

const context = paths.app

const commonConfig = merge([
  {
    context,
    resolve: {
      unsafeCache: true,
      symlinks: false,

      modules: [paths.nodeModules, 'node_modules'],
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        components: paths.components
      }
    },
    output: {
      path: paths.build
    },
    plugins: [
      new HtmlPlugin({
        inject: true,
        template: paths.appHtml
      }),
      new FriendlyErrorsPlugin()
    ]
  },
  parts.lintJS({
    include: paths.app,
    options: lintJSOptions
  }),
  parts.loadJS({
    include: paths.app,
    options: {
      cacheDirectory: true,

      // We have to specify 'react-css-modules' plugin here and not in .babelrc,
      // because we need to use the 'context' variable
      plugins: [
        [
          'react-css-modules',
          {
            context,
            generateScopedName: parts.localIdentName,
            exclude: 'node_modules',
            webpackHotModuleReloading: true,
            filetypes: {
              '.scss': {
                syntax: 'postcss-scss'
              }
            }
          }
        ]
      ]
    }
  }),
  parts.loadFonts({
    include: paths.app,
    options: {
      name: `${paths.buildFonts}/[name].[hash:8].[ext]`
    }
  })
])

const productionConfig = merge([
  {
    entry: {
      app: ['babel-polyfill', paths.appIndex]
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js'
    },
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000 // in bytes
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new CleanPlugin(paths.build),
      new ManifestPlugin({
        fileName: 'manifest-webpack.json'
      }),
      new SWPrecachePlugin({

        // change it to your app's cache name
        cacheId: 'react-starter-v1',

        filename: 'sw.js',
        staticFileGlobsIgnorePatterns: [/\.map$/]
      }),
      new BundleAnalyzerPlugin(),
      new CopyPlugin([
        { from: paths.manifest, to: paths.build },
        { from: paths.favicon, to: paths.build }
      ])
    ]
  },
  parts.minifyJS(),
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
  ]),
  parts.extractCSS({
    include: paths.app,
    use: [parts.autoprefix(), cssPreprocessorLoader]
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  }),
  parts.loadImages({
    include: paths.app,
    options: {
      limit: 15000,
      name: `${paths.buildImages}/[name].[hash:8].[ext]`
    }
  }),
  // should go after loading images
  parts.optimizeImages(),
  parts.setFreeVariable('process.env.NODE_ENV', 'production')
])

const developmentConfig = merge([
  {
    entry: {
      app: ['react-hot-loader/patch', paths.appIndex]
    },
    devtool: 'cheap-module-eval-source-map',
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    plugins: [new webpack.NamedModulesPlugin()]
  },
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS({ include: paths.app, use: [cssPreprocessorLoader] }),
  parts.loadImages({ include: paths.app })
])

module.exports = (env) => {
  process.env.BABEL_ENV = env

  if (env === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}
