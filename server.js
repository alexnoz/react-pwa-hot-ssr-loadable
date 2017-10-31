require('babel-register')

const http = require('http')
const express = require('express')
const compression = require('compression')
const chalk = require('chalk')
const favicon = require('serve-favicon')

const devWebpackConfig = require('./config/webpack.client.config')
const paths = require('./config/paths')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = devWebpackConfig.output.publicPath
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080

const serve = (path, cache) => express.static(path, {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use(publicPath.slice(0, -1), serve(paths.build, true))
app.use('/manifest.json', serve(paths.manifest, true))
app.use(favicon(paths.favicon))
app.use('/sw.js', serve('./build/sw.js'))

if (isProd) {
  const assets = require('./build/assets.json')

  app.get('*', require('./build/server-bundle').default(assets))
} else {
  const compiler = require('webpack')(devWebpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.get('*', require('./app/render-dev-app'))
}

app.use((err, req, res, next) => {
  console.error(chalk`{red error:} {underline.redBright ${err.message}}`)
  res.status(err.status || 500)
})

server.listen(port, () => {
  console.log(chalk`{blue the server is running at} {bold.cyan localhost:${port}}`)
})
