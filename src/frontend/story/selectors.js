export const isOpeningStory = (state) =>
  state.story.openingStory === true

export const getStoryPath = (state) =>
  state.story.storyPath

export const isCreatingStory = (state) =>
  state.story.creatingStory === true

export const isClosingStory = (state) =>
  state.story.closingStory === true
