import React from 'react'

const About = () => (
  <div>
    <h2>About:</h2>
    <p>The aim of this project is to provide a boilerplate that helps to build a PWA using SSR, HMR and Code Splitting</p>
    <h3>Features:</h3>
    <ul>
      <li>Hot module replacement</li>
      <li>Server-side rendering</li>
      <li>Code splitting</li>
      <li>Progressive Web App (passes all of the {
        <a rel='noopener noreferer' target='_blank' href='https://developers.google.com/web/tools/lighthouse/'>lighthouse's</a>
      } audits)
      </li>
    </ul>
  </div>
)

export default About
