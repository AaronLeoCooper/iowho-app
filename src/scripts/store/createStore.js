import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import persistState from 'redux-localstorage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './redux'

// Control what exactly is stored in localStorage from state
// const statePersistSlicer = (paths) => {
//   return (state) => {
//     return {
//       IOweWidget: {
//         currenciesList: state.IOweWidget.currenciesList,
//         currencyKey: state.IOweWidget.currencyKey,
//         owes: state.IOweWidget.owes
//       }
//     }
//   }
// }

export default (initState = {}) => {
  const storeMiddleware = process.env.NODE_ENV === 'production'
    ? [thunk, routerMiddleware(browserHistory)]
    : [thunk, routerMiddleware(browserHistory), logger()]

  // Compose enhancer conditional to enable redux devtools browser exntension
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const storeEnhancer = composeEnhancer(
    applyMiddleware(...storeMiddleware),
    persistState(['OwesState'], { key: 'iowho-state' })
  )

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
