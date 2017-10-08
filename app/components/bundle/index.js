import 'regenerator-runtime/runtime'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Bundle extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    // eslint-disable-next-line
    loader: PropTypes.func
  }

  static defaultProps = {
    loader: () => <p>Loading...</p>
  }

  state = {
    mod: null
  }

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load)
      this.load(nextProps)
  }

  async load (props) {
    this.setState({ mod: props.loader })

    // using `mod` as a variable name because `module` is a JS keyword
    const mod = await props.load()

    this.setState({
      // handle both es imports and cjs
      mod: mod.default ? mod.default : mod
    })
  }

  render () {
    return this.state.mod ? this.props.children(this.state.mod) : null
  }
}

export default Bundle
