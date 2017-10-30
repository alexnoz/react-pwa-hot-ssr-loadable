import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * This function returns the `Loading`
 * component that you can use while
 * your module is being loaded.
 *
 * @param {Object} [options]
 *
 * @param {number} [options.delay=200]
 * Time to wait (in ms) before `LoadingComponent` is rendered.
 *
 * @param {number} [options.timeout=5000]
 * Time to wait (in ms) before `TimeoutComponent` is rendered.
 *
 * @param {ReactComponent} [options.LoadingComponent=() => null]
 * A component that renders when a module is loading longer than
 * it is specified in the `delay` param.
 *
 * @param {ReactComponent} [options.TimeoutComponent=() => null]
 * A component that renders when a module is loading longer than
 * it is specified in the `timeout` param.
 *
 * @param {ReactComponent} [options.ErrorComponent=() => null]
 * A component that renders if an error is thrown during module's loading.
 * This component accepts an `error` object as a prop.
 *
 * @returns {ReactComponent} A `Loading` component.
 */

const getLoadingComponent = ({
  delay = 200,
  timeout = 5000,
  LoadingComponent = () => null,
  TimeoutComponent = () => null,
  ErrorComponent = () => null
} = {}) => {
  class Loading extends Component {
    state = {
      timedOut: false,
      LoadingComponent: () => null
    }

    componentDidMount () {
      this.delayTimer = setTimeout(() => {
        this.setState({ LoadingComponent })
      }, delay)

      this.timeoutTimer = setTimeout(() => {
        this.setState({ timedOut: true })
      }, timeout)
    }

    componentWillUnmount () {
      clearTimeout(this.delayTimer)
      clearTimeout(this.timeoutTimer)
    }

    render () {
      const { LoadingComponent, timedOut } = this.state
      const { error } = this.props

      return error
        ? <ErrorComponent error={error} />
        : timedOut
          ? <TimeoutComponent />
          : <LoadingComponent />
    }
  }

  Loading.propTypes = {
    error: PropTypes.object
  }

  return Loading
}

export default getLoadingComponent
