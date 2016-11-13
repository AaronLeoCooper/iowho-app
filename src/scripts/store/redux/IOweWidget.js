/**
 * IOweWidget
 */

import { IOweWidget as getInitState } from '../initState'
import { IOweWidget as C, App as C_App } from '../constants'
import * as ErrorState from './ErrorState'
import { createSelector } from 'reselect'
import { validateOwe } from '../../helpers/owe-helpers.js'

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

export const createOwe = () => {
  return (dispatch, getState) => {
    const state = getState().IOweWidget
    const owe = {
      id: state.owes.length,
      iOweThem: !!state.iOweThem,
      name: state.name || '',
      amount: state.amount || '',
      currency: getCurrency(state)
    }

    console.log('owe', owe)

    // Only create new owe if it passes validation
    const validOwe = validateOwe(owe)

    if (validOwe.hasError) {
      dispatch(ErrorState.createError(validOwe))
    } else {
      dispatch({ type: C.CREATE_OWE, payload: owe })
      dispatch(clearOweState())
      dispatch(ErrorState.clearError())
    }
  }
}

export const clearOweState = () => ({ type: C.CLEAR_OWE_STATE })

export const removeOwe = (oweId = undefined) => {
  oweId = parseInt(oweId)

  if (oweId.toString() === 'NaN') return // Reject NaN IDs

  return (dispatch, getState) => {
    const state = getState().IOweWidget
    const owes = state.owes
      .filter(owe => owe.id !== oweId)
      .map(owe => {
        if (owe.id > oweId) {
          owe.id -= 1
        }
        return owe
      })

    dispatch({ type: C.REMOVE_OWE, payload: owes })
  }
}

export const clearAll = () => {
  return (dispatch) => {
    dispatch({ type: C.CLEAR_ALL })
    dispatch(ErrorState.clearError())
  }
}

// Selectors
const getCurrenciesList = (state) => state.currenciesList
const getCurrencyKey = (state) => state.currencyKey
const getOwes = (state) => state.owes

export const getCurrency = createSelector(
  [ getCurrenciesList, getCurrencyKey ],
  (currenciesList, currencyKey) => currenciesList[currencyKey]
)

export const getOwesCount = createSelector(
  [ getOwes ],
  (owes) => owes.length
)

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

    case C.SET_CURRENCY:
      return { ...state, currencyKey: action.payload }

    case C.CREATE_OWE:
      return { ...state, owes: [ ...state.owes, action.payload ] }

    case C.CLEAR_OWE_STATE:
      return {
        ...state,
        iOweThem: initState.iOweThem,
        name: initState.name,
        amount: initState.amount
      }

    case C.REMOVE_OWE:
      return { ...state, owes: action.payload }

    case C.CLEAR_ALL:
    case C_App.CLEAR_ALL:
      return initState

    default: return state
  }
}
