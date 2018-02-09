import { getStoryByWindowId } from './selectors'
import { removeStoryByWindowId } from './actions'

const close = (window) => async (dispatch, getState) => {
  const story = getStoryByWindowId(getState(), window.id)
  try {
    if (story) {
      await story.close()
    }
  } finally {
    dispatch(removeStoryByWindowId(window.id))
    window.destroy()
  }
}

export default close
