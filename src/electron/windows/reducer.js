import * as t from './action-types'

const initialState = {}

const reducer = (state = initialState, action) => {
  let id
  let window
  let storyPath

  switch (action.type) {
    case t.ADD_WINDOW:
      id = action.payload.window.id
      window = {
        instance: action.payload.window,
        ready: false,
        storyPath: '',
        focused: false
      }
      return { ...state, [id]: window }

    case t.REMOVE_WINDOW:
      window = action.payload.window
      id = Object.keys(state).find((id) => state[id].instance === window)
      const clone = { ...state }
      delete clone[id]
      return clone

    case t.SET_WINDOW_IS_READY:
      id = action.payload.id
      window = { ...state[id], ready: true }
      return { ...state, [id]: window }

    case t.SET_WINDOW_STORY_PATH:
      id = action.payload.id
      storyPath = action.payload.storyPath
      window = { ...state[id], storyPath }
      return { ...state, [id]: window }

    case t.SET_WINDOW_FOCUS_STATUS:
      id = action.payload.id
      window = { ...state[id], focused: action.payload.status === true }
      return { ...state, [id]: window }

    default:
      return state
  }
}

export default reducer
