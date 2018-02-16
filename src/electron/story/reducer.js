import { ADD_LOADING_STORY, REMOVE_STORY_BY_WINDOW_ID, SET_STORY_LOADED } from './action-types'

import { createReducer } from '../../shared/redux'

const initialState = {}

export default createReducer(initialState, {
  [ADD_LOADING_STORY]: (state, { path, windowId }) => ({
    ...state,
    [path]: {
      windowId,
      loading: true,
      instance: null
    }
  }),

  [SET_STORY_LOADED]: (state, { path, instance }) => ({
    ...state,
    [path]: {
      ...state[path],
      loading: false,
      instance
    }
  }),

  [REMOVE_STORY_BY_WINDOW_ID]: (state, { windowId }) => {
    const path = Object.keys(state).find((path) => state[path].windowId === windowId)
    const clone = { ...state }
    delete clone[path]
    return clone
  }
})
