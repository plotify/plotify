import { ADD_WINDOW, REMOVE_WINDOW, SET_WINDOW_FOCUS_STATUS, SET_WINDOW_IS_READY, SET_WINDOW_STORY_PATH } from './action-types'

import { createReducer } from '../../shared/redux'

const initialState = {}

export default createReducer(initialState, {
  [ADD_WINDOW]: (state, { window }) => ({
    ...state,
    [window.id]: {
      instance: window,
      ready: false,
      storyPath: '',
      focused: false
    }
  }),

  [REMOVE_WINDOW]: (state, { window }) => {
    const id = Object.keys(state).find((id) => state[id].instance === window)
    const clone = { ...state }
    delete clone[id]
    return clone
  },

  [SET_WINDOW_IS_READY]: (state, { id }) => ({
    ...state,
    [id]: {
      ...state[id],
      ready: true
    }
  }),

  [SET_WINDOW_STORY_PATH]: (state, { id, storyPath }) => ({
    ...state,
    [id]: {
      ...state[id],
      storyPath
    }
  }),

  [SET_WINDOW_FOCUS_STATUS]: (state, { id, status }) => ({
    ...state,
    [id]: {
      ...state[id],
      focused: status === true
    }
  })
})
