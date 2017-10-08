import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

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

const Topics = ({ match: { url } }) => ([
  <h2 key={0}>Topics</h2>,
  <ul key={1} style={{ listStyle: 'none' }}>
    <li>
      <CustomLink to={`${url}/rendering`} label='Rendering' />
    </li>
    <li>
      <CustomLink to={`${url}/state`} label='State' />
    </li>
    <li>
      <CustomLink to={`${url}/portals`} label='Portals' />
    </li>
  </ul>,
  <Route key={2} exact path={url} render={() => <p>Please select a topic.</p>} />,
  <Route key={3} path={`${url}/:id`} render={({ match }) => (
    <p>Something about {match.params.id}</p>
  )} />
])

Topics.propTypes = {
  match: PropTypes.object
}

export default Topics
