/**
 * IOweWidget
 */

import { IOweWidget as getInitState } from '../initState'
import { IOweWidget as C } from '../constants'
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
export const setIOweCurrency = (currencyKey = undefined) => {
  return (dispatch, getState) => {
    if (typeof currencyKey === 'undefined') {
      currencyKey = getInitState().IOweWidget.currencyKey
    }

    dispatch({ type: C.SET_CURRENCY, payload: currencyKey })
  }
}

export const createOwe = (owe = {}) => {
  return (dispatch, getState) => {
    const state = getState().IOweWidget
    const owe = {
      iOweThem: state.iOweThem,
      name: state.name,
      amount: state.amount,
      currency: getCurrency(state)
    }
    dispatch({ type: C.CREATE_OWE, payload: owe })
  }
}

// Selectors
const getCurrenciesList = (state) => state.currenciesList
const getCurrencyKey = (state) => state.currencyKey

export const getCurrency = createSelector(
  [ getCurrenciesList, getCurrencyKey ],
  (currenciesList, currencyKey) => {
    return currenciesList[currencyKey]
  }
)

// Reducer
export default (state = getInitState(), action) => {
  switch (action.type) {
    case C.TOGGLE_THEM:
      return { ...state, iOweThem: action.payload }

    case C.SET_NAME:
      return { ...state, name: action.payload }

    case C.SET_AMOUNT:
      return { ...state, amount: action.payload }

    case C.SET_CURRENCY:
      return { ...state, currencyKey: action.payload }

    case C.CREATE_OWE:
      return { ...state, owes: [ ...state.owes, action.payload ] }

    default: return state
  }
}
