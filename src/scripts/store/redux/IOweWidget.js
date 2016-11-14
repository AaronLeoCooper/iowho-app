/**
 * IOweWidget
 */

import { IOweWidget as getInitState } from '../initState'
import { IOweWidget as C, App as C_App } from '../constants'
import * as ErrorState from './ErrorState'
import { createSelector } from 'reselect'

// Action creators
export const toggleIoOrder = (iOweThem = undefined) => {
  return (dispatch, getState) => {
    if (typeof iOweThem !== 'boolean') iOweThem = !getState().IOweWidget.iOweThem
    dispatch({ type: C.TOGGLE_THEM, payload: iOweThem })
  }
}

export const setIOweName = (name = '') => ({ type: C.SET_NAME, payload: name })
export const setIOweAmount = (amount = '') => ({ type: C.SET_AMOUNT, payload: amount })
export const clearOweState = () => ({ type: C.CLEAR_OWE_STATE })

export const clearAll = () => {
  return (dispatch) => {
    dispatch({ type: C.CLEAR_ALL })
    dispatch(ErrorState.clearError())
  }
}

// Selectors

// Reducer
export default (state = getInitState(), action) => {
  let initState = getInitState()

  switch (action.type) {
    case C.TOGGLE_THEM:
      return { ...state, iOweThem: action.payload }

    case C.SET_NAME:
      return { ...state, name: action.payload }

    case C.SET_AMOUNT:
      return { ...state, amount: action.payload }

    case C.CLEAR_OWE_STATE:
      return {
        ...state,
        iOweThem: initState.iOweThem,
        name: initState.name,
        amount: initState.amount
      }

    case C.CLEAR_ALL:
    case C_App.CLEAR_ALL:
      return initState

    default: return state
  }
}
