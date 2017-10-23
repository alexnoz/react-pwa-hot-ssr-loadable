import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'

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

render(App)
