import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Bundle from 'components/bundle'
import Header from 'components/header'

import './app.scss'

// Dynamically load components via `Bundle` helper component
const loadComponent = (name, props) => (
  <Bundle load={() => import(`components/${name}`)}>
    {Comp => <Comp {...props} />}
  </Bundle>
)

export default class App extends Component {
  state = { a: 0 }

  handleClick = () => {
    this.setState(({ a }) => ({
      a: ++a
    }))
  }

  render () {
    const { a } = this.state

    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' render={props => (
              loadComponent('home', props)
            )} />
            <Route path='/about' render={props => (
              loadComponent('about', props)
            )} />
            <Route path='/topics' render={props => (
              loadComponent('topics', props)
            )} />
          </Switch>
          <button onClick={this.handleClick}>
            {a ? `Clicked ${a} times` : 'Click me!'}
          </button>
        </main>
      </div>
    )
  }
}
