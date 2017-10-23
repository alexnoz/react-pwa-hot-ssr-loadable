import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

import Header from 'components/header'
import routes from './routes'

import './assets/styles/index.scss'

export default class App extends Component {
  state = { a: 0 }

  handleClick = () => {
    this.setState(({ a }) => ({
      a: ++a
    }))
  }

  render () {
    const { a } = this.state

    return [
      <Header key={0} />,
      <main key={1}>
        {renderRoutes(routes)}
        <button onClick={this.handleClick}>
          {a ? `Clicked ${a} times` : 'Click me!'}
        </button>
      </main>
    ]
  }
}
