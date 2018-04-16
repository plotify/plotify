import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../../shared/view/requests'
import { removeWindow, setWindowIsReady } from '../actions'

import { closeSplashScreen } from '../../splash-screen'
import { getWindowStoryPath } from '../selectors'
import { isDarkThemeEnabled } from '../../preferences'
import { openStory } from '../../story'
import { request } from '../../shared/communication'

const handleReadyToShow = (event) => async (dispatch, getState) => {
  const window = event.sender
  const storyPath = getWindowStoryPath(getState(), window.id)

  dispatch(setWindowIsReady(window.id))
  try {
    await enableOrDisableDarkTheme(getState, window)
  } finally {
    await handleReadyWindow(dispatch, window, storyPath)
  }
}

const enableOrDisableDarkTheme = async (getState, window) => {
  if (isDarkThemeEnabled(getState())) {
    await request(window, ENABLE_DARK_THEME)
  } else {
    await request(window, DISABLE_DARK_THEME)
  }
}

const handleReadyWindow = async (dispatch, window, storyPath) => {
  if (storyPath !== '') {
    const successful = await dispatch(openStory(window, storyPath))
    if (successful) {
      showWindow(dispatch, window)
    } else {
      dispatch(removeWindow(window))
      window.destroy()
      dispatch(closeSplashScreen())
    }
  } else {
    showWindow(dispatch, window)
  }
}

const showWindow = (dispatch, window) => {
  window.maximize()
  window.show()
  dispatch(closeSplashScreen())
}

export default handleReadyToShow
