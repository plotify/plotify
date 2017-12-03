export const isOpeningStory = (state) => (
  state.story.openingStory === true
)

export const isOpeningStoryFailed = (state) => (
  state.story.openingStoryFailed === true
)

export const getOpeningStoryErrorMessage = (state) => (
  state.story.openingStoryErrorMessage
)

export const isShowOpenStoryDialog = (state) => (
  state.story.showOpenStoryDialog === true
)

export const isStoryOpen = (state) => (
  state.story.openStory !== null
)

export const getStoryPath = (state) => (
  state.story.openStory
)

export const isCreatingStory = (state) => (
  state.story.creatingStory === true
)

export const isShowCreateStoryDialog = (state) => (
  state.story.showCreateStoryDialog === true
)

export const isCreatingStoryFailed = (state) => (
  state.story.creatingStoryFailed === true
)

export const getCreatingStoryErrorMessage = (state) => (
  state.story.creatingStoryErrorMessage
)
