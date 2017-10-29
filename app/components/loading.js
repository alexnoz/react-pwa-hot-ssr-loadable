import React from 'react'
import getLoadingComponent from '../helpers/get-loading-component'

// Just make the `Loading` component here
// and export it, it will be picked by the
// `../routes/async` module and shown when
// your modules are being loaded.
// For docs, see `../helpers/get-loading-component`.

const Loading = getLoadingComponent({
  LoadingComponent: () => <div>Loading...</div>,
  TimeoutComponent: () => <div>Taking a loooong time...</div>,
  ErrorComponent: () => <div style={{ color: 'red' }}>Something went wrong ¯\_(ツ)_/¯</div>
})

export default Loading
