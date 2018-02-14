import { createOrFocus, getWindowByStoryPath, setWindowStoryPath } from '../windows'

import { STORY_CLOSED } from '../../shared/story/requests'
import { getStoryByWindowId } from './selectors'
import { removeStoryByWindowId } from './actions'
import { request } from '../shared/communication'

const close = (window, closeWindow, focusWelcomeWindow) => async (dispatch, getState) => {
  const story = getStoryByWindowId(getState(), window.id)
  try {
    if (story) {
      await story.close()
    }
  } finally {
    dispatch(removeStoryByWindowId(window.id))

    const welcomeWindowExisting = getWindowByStoryPath(getState(), '') !== undefined
    if (closeWindow || welcomeWindowExisting) {
      window.destroy()
    } else {
      dispatch(setWindowStoryPath(window.id, ''))
      request(window, STORY_CLOSED)
    }

    if (focusWelcomeWindow) {
      dispatch(createOrFocus(''))
    }
  }
}

export default close
