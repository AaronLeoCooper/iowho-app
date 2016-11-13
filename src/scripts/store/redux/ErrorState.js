/**
 * ErrorState
 */

import { ErrorState as getInitState } from '../initState'
import { ErrorState as C, App as C_App } from '../constants'

// Action creators
export const createError = (error = {}) => ({ type: C.CREATE_ERROR, payload: error })
export const clearError = () => ({ type: C.CLEAR_ERROR })

// Reducer
export default (state = getInitState(), action) => {
  switch (action.type) {
    case C.CREATE_ERROR:
      return { ...state, ...action.payload }

    case C.CLEAR_ERROR:
    case C_App.CLEAR_ERROR:
      return getInitState()

    default: return state
  }
}
