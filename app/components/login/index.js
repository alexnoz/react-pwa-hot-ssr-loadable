import React from 'react'

import './login.scss'

const Login = () => (
  <div styleName='wrapper'>
    <h2 styleName='heading'>Hey, I'am a dynamically loaded form</h2>
    <form action='/' styleName='form'>
      <label htmlFor='name' styleName='label'>Name</label>
      <input
        id='name' type='text' styleName='input'
        name='name' placeholder='Your name...'
      />
      <label htmlFor='email' styleName='label'>Email</label>
      <input
        id='email' type='email' styleName='input'
        name='name' placeholder='Your email...'
      />
      <button type='submit' styleName='submit'>Submit</button>
    </form>
  </div>
)

export default Login
