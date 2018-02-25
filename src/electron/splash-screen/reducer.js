import { DECREMENT_LOADING_PROCESSES, INCREMENT_LOADING_PROCESSES, SET_WINDOW } from './action-types'

import { createReducer } from '../../shared/redux'

const initialState = {
  window: null,
  loadingProcesses: 0
}

export default createReducer(initialState, {
  [INCREMENT_LOADING_PROCESSES]: (state) => ({
    ...state,
    loadingProcesses: state.loadingProcesses + 1
  }),

  [DECREMENT_LOADING_PROCESSES]: (state) => ({
    ...state,
    loadingProcesses: state.loadingProcesses > 0 ? state.loadingProcesses - 1 : 0
  }),

  [SET_WINDOW]: (state, { window }) => ({ ...state, window })
})
