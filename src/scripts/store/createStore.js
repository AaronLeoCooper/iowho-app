import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './redux'

export default (initState = {}) => {
  const storeMiddleware = process.env.NODE_ENV === 'production'
    ? [thunk, routerMiddleware(browserHistory)]
    : [thunk, routerMiddleware(browserHistory), logger()]

  // Compose enhancer conditional to enable redux devtools browser exntension
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const storeEnhancer = composeEnhancer(applyMiddleware(...storeMiddleware))

  // Add the reducer to your store on the `routing` key
  const store = createStore(
    rootReducer,
    initState,
    storeEnhancer
  )

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./redux/index.js', () =>
      store.replaceReducer(require('./redux/index.js'))
    )
  }

  return store
}
