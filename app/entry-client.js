/* eslint import/namespace: ['error', { allowComputed: true }] */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'
import * as bundles from './routes'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  )
}

if (process.env.NODE_ENV === 'production') {
  window.onload = e => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.register('/sw.js')
  }
}

if (module.hot) {
  module.hot.accept('./app', () => { render(App) })
}

const splitPoints = window.splitPoints || []

Promise.all(splitPoints.map(chunk => bundles[chunk].loadComponent()))
  .then(() => render(App))
  .catch(err => { throw err })
