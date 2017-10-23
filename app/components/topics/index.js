import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const CustomLink = ({ label, to, exact }) => (
  <Route path={to} exact={exact} children={({ match }) => (
    <div>
      {match ? '>' : ''} <Link to={to}>{label}</Link>
    </div>
  )} />
)

CustomLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

const Topics = ({ route, match: { url } }) => {
  return [
    <h2 key={0}>Topics</h2>,
    <p key={1}>Here is a nested routes example</p>,
    <ul key={2} style={{ listStyle: 'none' }}>
      <li>
        <CustomLink to={`${url}/rendering`} label='Rendering' />
      </li>
      <li>
        <CustomLink to={`${url}/reconciliation`} label='Reconciliation' />
      </li>
      <li>
        <CustomLink to={`${url}/portals`} label='Portals' />
      </li>
    </ul>,
    <Route key={3} exact path={url} render={() => <p>Please, select a topic</p>} />,
    <div key={4}>{renderRoutes(route.routes)}</div>
  ]
}

export default Topics
