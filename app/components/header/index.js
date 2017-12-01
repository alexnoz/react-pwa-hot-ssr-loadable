import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import s from './header.scss'

const StyledNavLink = ({ label, ...props }) => (
  <NavLink
    {...props}
    styleName='nav-link'
    activeClassName={s['nav-link-active']}
  >
    {label}
  </NavLink>
)

StyledNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool
}

const Header = () => (
  // TODO: make purify-css work with CSS modules correctly
  <header styleName='header'>
    <h1>Welcome to React!</h1>
    <nav>
      <ul styleName='nav-block'>
        <li styleName='nav-item'>
          <StyledNavLink exact to='/' label='Home' />
        </li>
        <li styleName='nav-item'>
          <StyledNavLink to='/about' label='About' />
        </li>
        <li styleName='nav-item'>
          <StyledNavLink to='/topics' label='Topics' />
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
