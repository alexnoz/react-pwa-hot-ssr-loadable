const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  app: resolveApp('app'),
  components: resolveApp('app/components'),
  appIndex: resolveApp('app/index.js'),
  public: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  manifest: resolveApp('public/manifest.json'),
  favicon: resolveApp('public/favicon.ico'),
  build: resolveApp('build'),

  // These paths are relatve to the 'build' folder
  static: './static',
  buildImages: './static/images',
  buildFonts: './static/fonts',
  buildStyles: './static/styles',

  packageJson: resolveApp('package.json'),
  nodeModules: resolveApp('node_modules')
}
