import * as t from './actionTypes'

const initialState = {
  aboutOpen: false,
  contributorsOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.OPEN_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: true
      })

    case t.CLOSE_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: false
      })

    case t.OPEN_CONTRIBUTORS_DIALOG:
      return Object.assign({}, state, {
        contributorsOpen: true
      })

    case t.CLOSE_CONTRIBUTORS_DIALOG:
      return Object.assign({}, state, {
        contributorsOpen: false
      })

    default:
      return state
  }
}

export default reducer
