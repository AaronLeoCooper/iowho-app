import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store/createStore'
import routes from './routes'

const store = createStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

function AppRouter (props) {
  return (
    <div>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </div>
  )
}

export default AppRouter
