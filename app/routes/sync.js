import React from 'react'
import PropTypes from 'prop-types'

const loadComponentSync = path => {
  const mod = require(`components/${path}`)
  const Component = mod.default ? mod.default : mod // es6 module compat

  const SyncComponent = props => {
    const { staticContext: ctx } = props

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
