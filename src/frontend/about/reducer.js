import * as t from './actionTypes'

import { CLOSE_STORY_PREPARATION_STARTED, CREATE_STORY_STARTED, OPEN_STORY_STARTED } from '../story/action-types'

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

    case CREATE_STORY_STARTED:
    case OPEN_STORY_STARTED:
    case CLOSE_STORY_PREPARATION_STARTED:
      return initialState

    default:
      return state
  }
}

export default reducer
