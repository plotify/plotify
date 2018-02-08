import * as t from './action-types'

const initialState = {}

const reducer = (state = initialState, action) => {
  let path
  let story

  switch (action.type) {
    case t.ADD_LOADING_STORY:
      path = action.payload.path
      story = {
        windowId: action.payload.windowId,
        loading: true,
        instance: null
      }
      return { ...state, [path]: story }

    case t.SET_STORY_LOADED:
      path = action.payload.path
      story = {
        ...state[path],
        loading: false,
        instance: action.payload.instance
      }
      return { ...state, [path]: story }

    case t.REMOVE_STORY_BY_WINDOW_ID:
      const windowId = action.payload.windowId
      path = Object.keys(state)
        .find((path) => state[path].windowId === windowId)
      const clone = { ...state }
      delete clone[path]
      return clone

    default:
      return state
  }
}

export default reducer
