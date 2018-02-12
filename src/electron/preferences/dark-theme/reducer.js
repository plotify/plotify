import * as t from './action-types'

const initialState = false

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_DARK_THEME_ENABLED:
      return action.payload.enabled === true
    default:
      return state
  }
}

export default reducer
