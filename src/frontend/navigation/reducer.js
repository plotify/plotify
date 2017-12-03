import * as t from './actionTypes'

import { CREATE_STORY_STARTED, OPEN_STORY_STARTED } from '../story/action-types'

import { WELCOME_SECTION } from '../welcome/constants'

const initialState = {
  section: WELCOME_SECTION,
  drawerOpen: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_SECTION:
      return Object.assign({}, state, {
        section: action.payload.id,
        drawerOpen: false
      })

    case t.OPEN_NAVIGATION_DRAWER:
      return Object.assign({}, state, {
        drawerOpen: true
      })

    case t.CLOSE_NAVIGATION_DRAWER:
    case OPEN_STORY_STARTED:
    case CREATE_STORY_STARTED:
      return Object.assign({}, state, {
        drawerOpen: false
      })

    default:
      return state
  }
}

export default reducer
