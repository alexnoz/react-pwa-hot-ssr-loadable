import React, { Component } from 'react'

import Loading from 'components/loading'

// Accept two arguments so that API is the same as in `./sync` module
const loadComponentAsync = (_, path) => (
  class AsyncComponent extends Component {
    static Component = null

    static loadComponent () {
      return import(`components/${path}`)
        .then(m => m.default)
        .then(Component => {
          AsyncComponent.Component = Component
          return Component
        })
        .catch(this.onError)
    }

    mounted = false

    state = {
      Component: AsyncComponent.Component,
      error: null
    }

    onError = error => {
      this.setState({ error })
    }

    componentWillMount () {
      if (this.state.Component === null)
        AsyncComponent
          .loadComponent()
          .then(Component => {
            if (this.mounted)
              this.setState({ Component })
          })
          .catch(this.onError)
    }

    componentDidMount () {
      this.mounted = true
    }

    componentWillUnmount () {
      this.mounted = false
    }

    render () {
      const { Component } = this.state

      if (Component !== null)
        return <Component {...this.props} />

      return <Loading error={this.state.error} />
    }
  }
)

export default loadComponentAsync
