import * as t from './action-types'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_PREFERENCES_DATABASE:
      return action.payload.database
    default:
      return state
  }
}

export default reducer
