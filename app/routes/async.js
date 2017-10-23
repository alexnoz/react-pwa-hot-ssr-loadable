import 'regenerator-runtime/runtime'

import React, { Component } from 'react'

const loadComponent = getComponent => (
  class AsyncComponent extends Component {
    static Component = null;

    static loadComponent () {
      return getComponent().then(m => m.default).then(Component => {
        AsyncComponent.Component = Component
        return Component
      })
    };

    mounted = false;

    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount () {
      if (this.state.Component === null) {
        AsyncComponent.loadComponent()
          .then(Component => {
            if (this.mounted) {
              this.setState({ Component })
            }
          }).catch(console.error.bind(console))
      }
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

      return <p>Loading...</p> // or <div /> with a loading spinner, etc..
    }
  }
)

const Home = loadComponent(() => import(/* webpackChunkName: 'home' */ 'components/home'))
const About = loadComponent(() => import(/* webpackChunkName: 'about' */ 'components/about'))
const Topics = loadComponent(() => import(/* webpackChunkName: 'topics' */ 'components/topics'))

// `Topics` nested components
const Rendering = loadComponent(() => import(/* webpackChunkName: 'topics.rendering' */ 'components/topics/rendering'))
const Portals = loadComponent(() => import(/* webpackChunkName: 'topics.portals' */ 'components/topics/portals'))
const Reconciliation = loadComponent(() => import(/* webpackChunkName: 'topics.reconciliation' */ 'components/topics/reconciliation'))

export {
  Home,
  About,
  Topics,
  Rendering,
  Portals,
  Reconciliation
}
