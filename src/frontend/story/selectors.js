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
