export const getStoryPaths = (state) =>
  Object.keys(state.stories)

export const getStoryByWindowId = (state, windowId) => {
  const path = Object.keys(state.stories)
    .find((path) => state.stories[path].windowId === windowId)
  return path ? state.stories[path].instance : undefined
}

export const isStoryLoading = (state, path) =>
  state.stories[path] ? state.stories[path].loading === true : false
