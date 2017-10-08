# React Hot SCSS Modules Boilerplate

A webpack@3 / React@16 based boilerplate for building web apps.

## Features:
* Hot Module Replacement via [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* Dynamic loading of views (code splitting)
* Progressive Web Application ([service worker](https://developers.google.com/web/fundamentals/primers/service-workers/), `manifest.json` included)
* CSS modules via [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules)
* [SCSS](http://sass-lang.com) preprocessor for CSS ([autoprefixer](https://github.com/postcss/autoprefixer) included)
* [React router 4](https://reacttraining.com/react-router/web)
* JS linting via [Eslint](https://eslint.org), extends [eslint-config-standard](https://github.com/standard/eslint-config-standard) and [eslint-config-standard-react](https://github.com/standard/eslint-config-standard-react). It includes the following plugins:
  * [import](https://github.com/benmosher/eslint-plugin-import)
  * [node](https://github.com/mysticatea/eslint-plugin-node)
  * [promise](https://github.com/xjamundx/eslint-plugin-promise)
  * [compat](https://github.com/amilajack/eslint-plugin-compat)
  * [react](https://www.npmjs.com/package/eslint-plugin-react)

## Usage:
* Clone the repo via `git clone https://github.com/alexnoz/react-hot-scss-modules-boilerplate.git`
* `cd react-hot-scss-modules-boilerplate`
* Run `yarn install` to fetch all the dependencies
* Run `yarn start` to start the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) (`localhost:8080` will be opened automatically)
* Start developing
* When you are done, run `yarn run build` to get the production version of your app
