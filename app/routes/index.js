// Load modules synchronously in development,
// and asynchronously in production
// (change `./sync` to `./async` via webpack.NormalModuleReplacementPlugin).
import loadComponent from './sync'

// use this function to load components dynamically
// (component-level code splitting)
export default loadComponent

// use this pattern to load routes dynamically
// (route-level code splitting)
export const Home = loadComponent('Home', 'home')

export const About = loadComponent('About', 'about')

export const Topics = loadComponent('Topics', 'topics')
export const Reconciliation = loadComponent('Reconciliation', 'topics/reconciliation')
export const Rendering = loadComponent('Rendering', 'topics/rendering')
export const Portals = loadComponent('Portals', 'topics/portals')
