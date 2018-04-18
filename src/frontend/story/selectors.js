export const isOpeningStory = (state) =>
  state.story.openingStory === true

export const isShowOpenStoryDialog = (state) =>
  state.story.showOpenStoryDialog === true

export const isStoryOpen = (state) =>
  state.story.openStory !== null

export const getStoryPath = (state) =>
  state.story.openStory

export const isCreatingStory = (state) =>
  state.story.creatingStory === true

export const isShowCreateStoryDialog = (state) =>
  state.story.showCreateStoryDialog === true

export const isClosingStory = (state) =>
  state.story.closingStory === true
