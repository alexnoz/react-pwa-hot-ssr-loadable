const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const paths = require('./paths')

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    compress: true,
    contentBase: paths.public,
    // publicPath: '/',
    watchContentBase: true,
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host, // Defaults to `localhost`
    port, // Defaults to 8080

    // overlay: true is equivalent
    overlay: {
      errors: true,
      warnings: false
    }
  }
})

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
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
      localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
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
        test: /\.(png|jpg|svg)$/,

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
