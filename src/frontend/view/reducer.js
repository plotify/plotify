import * as t from './actionTypes'

const initialState = {
  darkTheme: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.TOGGLE_DARK_THEME:
      return Object.assign({}, state, {
        darkTheme: !state.darkTheme
      })

    case t.ENABLE_DARK_THEME:
      return Object.assign({}, state, {
        darkTheme: true
      })

    case t.DISABLE_DARK_THEME:
      return Object.assign({}, state, {
        darkTheme: false
      })

    default:
      return state
  }
}

export default reducer
