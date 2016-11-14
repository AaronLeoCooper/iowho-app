/**
 * OwesState
 */

import { OwesState as getInitState } from '../initState'
import { OwesState as C, App as C_App } from '../constants'
import { clearOweState } from './IOweWidget'
import * as ErrorState from './ErrorState'
import { createSelector } from 'reselect'
import { validateOwe } from '../../helpers/owe-helpers.js'

// Action creators
export const createOwe = () => {
  return (dispatch, getState) => {
    const stateIOwe = getState().IOweWidget
    const stateOwes = getState().OwesState
    const owe = {
      id: stateOwes.owes.length,
      iOweThem: !!stateIOwe.iOweThem,
      name: stateIOwe.name || '',
      amount: stateIOwe.amount || '',
      currency: getCurrency(stateOwes)
    }

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

export const removeOwe = (oweId = undefined) => {
  oweId = parseInt(oweId)

  if (oweId.toString() === 'NaN') return // Reject NaN IDs

  return (dispatch, getState) => {
    const state = getState().OwesState
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

export const setCurrency = (currencyKey = undefined) => {
  return (dispatch, getState) => {
    if (typeof currencyKey === 'undefined') {
      currencyKey = getInitState().currencyKey
    }

    dispatch({ type: C.SET_CURRENCY, payload: currencyKey })
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
  (owes) => owes ? owes.length : 0
)

// Reducer
export default (state = getInitState(), action) => {
  switch (action.type) {
    case C.CREATE_OWE:
      return { ...state, owes: [ ...state.owes, action.payload ] }

    case C.REMOVE_OWE:
      return { ...state, owes: action.payload }

    case C.SET_CURRENCY:
      return { ...state, currencyKey: action.payload }

    case C.CLEAR_ALL:
    case C_App.CLEAR_ALL:
      return getInitState()

    default: return state
  }
}
