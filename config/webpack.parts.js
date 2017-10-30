const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const paths = require('./paths')

const localIdentName = '[name]_[local]_[hash:base64:5]'

exports.localIdentName = localIdentName

exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  ))
})

exports.lintJS = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options
      }
    ]
  }
})

const sharedCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      localIdentName,
      // importLoaders: 1,
      modules: true
    }
  }
]

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')]
  }
})

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: options,
      canPrint: true // false for analyzer
    })
  ]
})

exports.loadCSS = ({ include, exclude, use } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,

        include,
        exclude,

        use: [
          {
            loader: 'style-loader'
          },
          ...sharedCSSLoaders.concat(use)
        ]
      }
    ]
  }
})

exports.extractCSS = ({ include, exclude, use } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: `${paths.buildStyles}/[name].[contenthash:8].css`,
    allChunks: true
  })

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,

          include,
          exclude,

          use: plugin.extract({
            use: sharedCSSLoaders.concat(use),
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  }
}

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,

        include,
        exclude,

        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
})

exports.optimizeImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,

        include,
        exclude,

        use: {

          loader: 'image-webpack-loader',

          options: {
            progressive: true,

            // optimizationLevel: 7,

            gifsicle: {
              interlaced: false
            },

            /*
            mozjpeg: {

            },

            svgo: {

            }, */

            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
        }
      }
    ]
  }
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,

        include,
        exclude,

        use: {
          loader: 'file-loader',
          options
        }
      }
    ]
  }
})

exports.loadJS = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,

        include,
        exclude,

        loader: 'babel-loader',
        options
      }
    ]
  }
})

exports.minifyJS = () => ({
  plugins: [
    new BabiliPlugin()
  ]
})

exports.setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}
