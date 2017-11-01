import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import App from './app'

const Html = require('./html')

const renderProdApp = assets => (req, res) => {
  const splitPoints = []
  const content = renderToString(
    <StaticRouter location={req.url} context={{ splitPoints }}>
      <App />
    </StaticRouter>
  )

  const chunkNames = splitPoints.map(name => name.replace(/\//g, '-') + '.js')

  const html = renderToString(
    <Html content={content} assets={assets} chunkNames={chunkNames} />
  )
  res.send('<!doctype html>' + html)
}

export default renderProdApp
