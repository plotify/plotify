import * as t from './actionTypes'

const initialState = {
  darkTheme: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case t.TOGGLE_DARK_THEME:
      return Object.assign({}, state, {
        darkTheme: !state.darkTheme
      })
    default:
      return state
  }
}

export default reducer
