/**
 * Common location for Redux-specific components
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import IOweWidget from './IOweWidget'

const rootReducer = combineReducers({
  routing: routerReducer,
  IOweWidget: IOweWidget
})

export default rootReducer
