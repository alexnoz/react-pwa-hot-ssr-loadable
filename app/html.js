const React = require('react')
const PropTypes = require('prop-types')

const isProd = process.env.NODE_ENV === 'production'

const Html = props => {
  const { assets, splitPoints } = props

  let { content } = props
  let scripts

  if (isProd) {
    content = <div id='app' dangerouslySetInnerHTML={{ __html: content }} />
    scripts = ['manifest.js', 'vendor.js']
      .map(name => <script src={assets[name]} />)
      .concat([
        <script dangerouslySetInnerHTML={{ __html: (
          'window.splitPoints = ' +
          JSON.stringify(splitPoints)
        ) }}
        />,
        <script src={assets['main.js']} />
      ])
  } else {
    const { output } = require('../config/webpack.client.config')
    content = <div id='app' />
    scripts = <script src={`${output.publicPath}${output.filename}`} />
  }

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <title>SSR Demo</title>
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
  splitPoints: PropTypes.array,
  content: PropTypes.string
}

module.exports = Html
