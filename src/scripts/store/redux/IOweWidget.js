/**
 * IOweWidget
 */

import { IOweWidget as getInitState } from '../initState'
import { IOweWidget as C } from '../constants'

// Action creators
export const toggleIoOrder = (iOweThem = undefined) => {
  return (dispatch, getState) => {
    if (typeof iOweThem !== 'boolean') iOweThem = !getState().IOweWidget.iOweThem
    dispatch({ type: C.TOGGLE_IOWE_THEM, payload: iOweThem })
  }
}

export const setIOweName = (name = '') => ({ type: C.SET_IOWE_NAME, payload: name })
export const setIOweAmount = (amount = '') => ({ type: C.SET_IOWE_AMOUNT, payload: amount })
export const setIOweCurrency = (currency = '') => ({ type: C.SET_IOWE_CURRENCY, payload: currency })

// Reducer
export default (state = getInitState(), action) => {
  switch (action.type) {
    case C.TOGGLE_IOWE_THEM:
      return { ...state, iOweThem: action.payload }

    case C.SET_IOWE_NAME:
      return { ...state, name: action.payload }

    case C.SET_IOWE_AMOUNT:
      return { ...state, amount: action.payload }

    case C.SET_IOWE_CURRENCY:
      return { ...state, currency: action.payload }

    default: return state
  }
}
