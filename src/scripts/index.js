/**
 * Build entrypoint for app
 * (HMR disabled)
 */

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin() // Fix dreaded tap event delays

if (process.env.HMR) {
  // Webpack HMR only - load in scss
  require('../styles/app.scss')
}

const rootElement = document.getElementById('app')

ReactDOM.render(
  <AppRouter />,
  rootElement
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./AppRouter', () => {
    const NextApp = require('./AppRouter').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootElement
    )
  })
}
