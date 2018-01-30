import * as t from './action-types'

const initialState = {
  open: false,
  url: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SHOW_UPDATE_NOTIFICATION:
      return Object.assign({}, state, {
        open: true,
        url: action.payload.update.url
      })
    case t.CLOSE_UPDATE_NOTIFICATION:
      return Object.assign({}, state, {
        open: false,
        url: null
      })
    default:
      return state
  }
}

export default reducer
