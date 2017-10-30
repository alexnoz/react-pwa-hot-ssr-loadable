const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  root: appDirectory,
  app: resolveApp('app'),
  components: resolveApp('app/components'),
  entryClient: resolveApp('app/entry-client'),
  entryServer: resolveApp('app/entry-server'),
  public: resolveApp('public'),
  manifest: resolveApp('public/manifest.json'),
  favicon: resolveApp('public/favicon.ico'),
  build: resolveApp('build'),
  assets: resolveApp('build/assets.json'),
  buildServer: resolveApp('build/server-bundle'),
  buildSW: resolveApp('build/sw.js'),

  // These paths are relatve to the 'build' folder
  buildImages: 'images',
  buildFonts: 'fonts',
  buildStyles: 'styles',

  packageJson: resolveApp('package.json'),
  nodeModules: resolveApp('node_modules')
}
