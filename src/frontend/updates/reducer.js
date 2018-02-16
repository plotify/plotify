import { CLOSE_UPDATE_NOTIFICATION, SHOW_UPDATE_NOTIFICATION } from './action-types'

import { createReducer } from '../../shared/redux'

const initialState = {
  open: false,
  url: null
}

export default createReducer(initialState, {
  [SHOW_UPDATE_NOTIFICATION]: (state, { update }) => ({
    ...state,
    open: true,
    url: update.url
  }),

  [CLOSE_UPDATE_NOTIFICATION]: (state) => ({
    ...state,
    open: false,
    url: null
  })
})
