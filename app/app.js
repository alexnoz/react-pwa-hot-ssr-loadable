import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from 'components/header'
import { Home, About, Topics } from './routes'

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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/topics' component={Topics} />
        </Switch>
        <button onClick={this.handleClick}>
          {a ? `Clicked ${a} times` : 'Click me!'}
        </button>
      </main>
    ]
  }
}
