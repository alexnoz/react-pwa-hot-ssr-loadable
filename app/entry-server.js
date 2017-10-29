import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import assets from '../build/assets.json'

import App from './app'

const Html = require('./html')

const renderProdApp = (req, res) => {
  console.log(req.url)

  const splitPoints = []
  const content = renderToString(
    <StaticRouter location={req.url} context={{ splitPoints }}>
      <App />
    </StaticRouter>
  )

  console.log(splitPoints)

  const html = renderToString(
    <Html content={content} assets={assets} splitPoints={splitPoints} />
  )
  res.send('<!doctype html>' + html)
}

export default renderProdApp
