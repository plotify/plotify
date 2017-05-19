import { createSelector } from "reselect";

const getStory = (state) => state.story;

export const isStoryLoading = createSelector(
  [getStory],
  (story) => {
    return story.loading === true;
  }
);

export const isStoryLoadingFailed = createSelector(
  [getStory],
  (story) => {
    return story.loadingFailed === true;
  }
);


export const getStoryLoadingError = createSelector(
  [getStory, isStoryLoadingFailed],
  (story, loadingFailed) => {
    if (loadingFailed) {
      return story.error;
    } else {
      return null;
    }
  }
);

export const isStoryClosing = createSelector(
  [getStory],
  (story) => {
    return story.closing === true;
  }
);

export const isStoryClosingFailed = createSelector(
  [getStory],
  (story) => {
    return story.closingFailed === true;
  }
);

export const getStoryClosingError = createSelector(
  [getStory, isStoryClosingFailed],
  (story, storyClosingFailed) => {
    if (storyClosingFailed) {
      return story.error;
    } else {
      return null;
    }
  }
);

export const isStoryCreating = createSelector(
  [getStory],
  (story) => {
    return story.creating === true;
  }
);

export const isStoryCreationFailed = createSelector(
  [getStory],
  (story) => {
    return story.creationFailed === true;
  }
);

export const getStoryCreationError = createSelector(
  [getStory, isStoryCreationFailed],
  (story, storyCreationFailed) => {
    if (storyCreationFailed) {
      return story.error;
    } else {
      return null;
    }
  }
);


export const isStoryOpen = createSelector(
  [getStory],
  (story) => {
    return story.open === true;
  }
);

export const getOpenStoryFile = createSelector(
  [getStory],
  (story) => {
    return story.file;
  }
);
