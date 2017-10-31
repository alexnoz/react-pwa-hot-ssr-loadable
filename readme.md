# React boilerplate - Progressive Web App, Code Splitting, Server-Side Rendering, Hot Reloading

A webpack@3 / React@16 based boilerplate for building progressive web apps.

## Features:
* Hot Module Replacement in development via [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* Server-Side Rendering
* Dynamic loading of views (code splitting)
* Progressive Web App (passes all of the [lighthouse's](https://developers.google.com/web/tools/lighthouse/) audits)
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
* Clone the repo via `git clone https://github.com/alexnoz/react-pwa-hot-ssr-loadable.git`
* `cd react-pwa-hot-ssr-loadable`
* Run `yarn install` to fetch all the dependencies
* Run `yarn start` to start the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) on `localhost:8080`
* Start developing
* When you are done, run `yarn run prod` to build a production version of the app and run a server on `localhost:8081`
