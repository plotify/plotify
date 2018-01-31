import * as t from './action-types'

const initialState = {
  window: null,
  loadingProcesses: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.INCREMENT_LOADING_PROCESSES:
      return { ...state, loadingProcesses: state.loadingProcesses + 1 }
    case t.DECREMENT_LOADING_PROCESSES:
      if (state.loadingProcesses > 0) {
        return { ...state, loadingProcesses: state.loadingProcesses - 1 }
      } else {
        return state
      }
    case t.SET_WINDOW:
      return { ...state, window: action.payload.window }
    default:
      return state
  }
}

export default reducer
