/**
 * Common location for Redux-specific components
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import IOweWidget from './IOweWidget'
import ErrorState from './ErrorState'

const rootReducer = combineReducers({
  routing: routerReducer,
  IOweWidget: IOweWidget,
  ErrorState: ErrorState
})

export default rootReducer
