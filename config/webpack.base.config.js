const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const parts = require('./webpack.parts')
const paths = require('./paths')

const isProd = process.env.NODE_ENV === 'production'

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

const commonConfig = merge(
  {
    context,
    output: {
      path: paths.build,
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
      publicPath: '/static/'
    },
    resolve: {
      unsafeCache: true,
      symlinks: false,
      modules: [paths.nodeModules, 'node_modules'],
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        components: paths.components
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
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
)

const productionConfig = merge(
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000 // in bytes
    }
  },
  parts.minifyJS(),
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
  parts.optimizeImages()
)

const developmentConfig = merge(
  {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new FriendlyErrorsPlugin()
    ]
  },
  parts.loadCSS({ include: paths.app, use: [cssPreprocessorLoader] }),
  parts.loadImages({ include: paths.app })
)

module.exports = isProd
  ? merge(commonConfig, productionConfig)
  : merge(commonConfig, developmentConfig)
