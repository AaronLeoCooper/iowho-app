/**
 * Common location for Redux-specific components
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import App from './App'

const rootReducer = combineReducers({
  routing: routerReducer
})

export default rootReducer
