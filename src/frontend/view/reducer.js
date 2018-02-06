import * as t from './actionTypes'

const initialState = {
  darkTheme: false,
  fullScreenHintOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.TOGGLE_DARK_THEME:
      return { ...state, darkTheme: !state.darkTheme }
    case t.ENABLE_DARK_THEME:
      return { ...state, darkTheme: true }
    case t.DISABLE_DARK_THEME:
      return { ...state, darkTheme: false }

    case t.SHOW_FULL_SCREEN_HINT:
      return { ...state, fullScreenHintOpen: true }
    case t.CLOSE_FULL_SCREEN_HINT:
      return { ...state, fullScreenHintOpen: false }

    default:
      return state
  }
}

export default reducer
