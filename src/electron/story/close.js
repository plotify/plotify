import { removeStoryByWindowId, storyClosed } from './actions'

import { getStoryByWindowId } from './selectors'

const close = (window) => async (dispatch, getState) => {
  const story = getStoryByWindowId(getState(), window.id)
  try {
    if (story) {
      await story.close()
    }
  } finally {
    dispatch(removeStoryByWindowId(window.id))
    dispatch(storyClosed(story.path))
    window.destroy()
  }
}

export default close
