import React from 'react'
import PropTypes from 'prop-types'

// `path` should be relative to the `components/` folder
const loadComponentSync = path => {
  const mod = require(`components/${path}`)
  const Component = mod.default ? mod.default : mod // es6 module compat

  const SyncComponent = props => {
    const { staticContext: ctx } = props

    // Send the `path` to the server, via router's `staticContext` object,
    // so that it's able to determine names of the chunks to preload.
    if (ctx && ctx.splitPoints)
      ctx.splitPoints.push(path)

    return <Component {...props} />
  }

  SyncComponent.propTypes = {
    staticContext: PropTypes.object
  }

  return SyncComponent
}

export default loadComponentSync
