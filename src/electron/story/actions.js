import * as t from './action-types'

export const addLoadingStory = (path, windowId) => ({
  type: t.ADD_LOADING_STORY,
  payload: { path, windowId }
})

export const setStoryLoaded = (path, instance) => ({
  type: t.SET_STORY_LOADED,
  payload: { path, instance }
})

export const removeStoryByWindowId = (windowId) => ({
  type: t.REMOVE_STORY_BY_WINDOW_ID,
  payload: { windowId }
})
