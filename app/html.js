const React = require('react')
const PropTypes = require('prop-types')

const isProd = process.env.NODE_ENV === 'production'

const Html = props => {
  const { assets, chunkNames } = props

  let { content } = props
  let scripts
  let preloadLinks

  if (isProd) {
    content = <div id='app' dangerouslySetInnerHTML={{ __html: content }} />

    const urls = [
      'manifest.js',
      'vendor.js',
      ...chunkNames,
      'main.js'
    ].map(name => assets[name])

    scripts = []
    preloadLinks = []

    urls.forEach(url => {
      scripts.push(<script src={url} />)
      preloadLinks.push(<link rel='preload' as='script' href={url} />)
    })
  } else {
    content = <div id='app' />
    scripts = <script src='/static/app.js' />
  }

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <title>SSR Demo</title>
        {isProd && preloadLinks}
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
        {isProd && <link href={assets['main.css']} type='text/css' rel='stylesheet' />}
      </head>
      <body>
        {content}
        {scripts}
      </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  chunkNames: PropTypes.array,
  content: PropTypes.string
}

module.exports = Html
