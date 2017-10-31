import React, { Component } from 'react'

import Loading from 'components/loading'

// `path` should be relative to the `components/` folder
const loadComponentAsync = path => (
  class AsyncComponent extends Component {
    state = {
      Component: null,
      error: null
    }

    componentDidMount () {
      // Name a chunk via webpack's magic comment
      import(/* webpackChunkName: '[request]' */ `components/${path}`)
        .then(mod => mod.default ? mod.default : mod)
        .then(Component => {
          this.setState({ Component })
        })
        .catch(error => this.setState({ error }))
    }

    render () {
      const { Component } = this.state

      return Component
        ? <Component {...this.props} />
        : <Loading error={this.state.error} />
    }
  }
)

export default loadComponentAsync
