export function isStoryLoading(state) {
  return state.story.loading === true;
}

export function isStoryLoadingFailed(state) {
  return state.story.loadingFailed === true;
}

export function getStoryLoadingError(state) {
  if (isStoryLoadingFailed(state)) {
    return state.story.error;
  } else {
    return null;
  }
}

export function isStoryClosing(state) {
  return state.story.closing === true;
}

export function isStoryClosingFailed(state) {
  return state.story.closingFailed === true;
}

export function getStoryClosingError(state) {
  if (isStoryClosingFailed(state)) {
    return state.story.error;
  } else {
    return null;
  }
}

export function isStoryOpen(state) {
  return state.story.open === true;
}

export function getOpenStoryFile(state) {
  return state.story.file;
}
