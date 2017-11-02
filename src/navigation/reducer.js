import * as t from './actionTypes'

const initialState = {
  drawerOpen: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case t.OPEN_NAVIGATION_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: true
      })
    case t.CLOSE_NAVIGATION_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: false
      })
    default:
      return state
  }
}

export default reducer
