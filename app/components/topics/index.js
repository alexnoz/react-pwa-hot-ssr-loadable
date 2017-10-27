import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch } from 'react-router-dom'

import { Rendering, Reconciliation, Portals } from '../../routes'

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
    <Switch key={4}>
      <Route exact path={url} render={() => <p>Please, select a topic</p>} />,
      <Route path={`${url}/rendering`} component={Rendering} />
      <Route path={`${url}/reconciliation`} component={Reconciliation} />
      <Route path={`${url}/portals`} component={Portals} />
    </Switch>
  ]
}

export default Topics
