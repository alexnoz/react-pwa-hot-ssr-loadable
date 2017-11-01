const React = require('react')
const { renderToString } = require('react-dom/server')
const Html = require('./html')

const renderDevApp = (req, res) => {
  const html = renderToString(<Html />)

  res.send('<!doctype html>' + html)
}

module.exports = renderDevApp
