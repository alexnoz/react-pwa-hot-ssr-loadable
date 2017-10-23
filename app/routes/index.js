import {
  Home,
  About,
  Topics,
  Rendering,
  Reconciliation,
  Portals
} from './sync'

const routes = [
  {
    exact: true,
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/topics',
    component: Topics,
    routes: [
      {
        path: '/topics/rendering',
        component: Rendering
      },
      {
        path: '/topics/reconciliation',
        component: Reconciliation
      },
      {
        path: '/topics/portals',
        component: Portals
      }
    ]
  }
]

export default routes
