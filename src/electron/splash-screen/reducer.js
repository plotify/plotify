import * as t from './action-types'

const initialState = {
  window: null,
  loadingProcesses: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.INCREMENT_LOADING_PROCESSES:
      const loadingProcesses = state.loadingProcesses + 1
      return { ...state, loadingProcesses }

    case t.DECREMENT_LOADING_PROCESSES:
      if (state.loadingProcesses > 0) {
        const loadingProcesses = state.loadingProcesses - 1
        return { ...state, loadingProcesses }
      } else {
        return state
      }

    case t.SET_WINDOW:
      const window = action.payload.window
      return { ...state, window }

    default:
      return state
  }
}

export default reducer
