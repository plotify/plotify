import { DISABLE_DARK_THEME, ENABLE_DARK_THEME } from '../../../shared/view/requests'
import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../../../shared/story/requests'
import { removeWindow, setWindowIsReady } from '../actions'
import { request, requestHandlerOnce } from '../../shared/communication'

import { closeSplashScreen } from '../../splash-screen'
import { dialog } from 'electron'
import { getWindowStoryPath } from '../selectors'
import { isDarkThemeEnabled } from '../../preferences'

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
    try {
      await openStory(window, storyPath)
      showWindow(dispatch, window)
    } catch (error) {
      showErrorAndCloseWindow(dispatch, window, error)
    }
  } else {
    showWindow(dispatch, window)
  }
}

const openStory = (window, storyPath) => {
  return new Promise((resolve, reject) => {
    requestHandlerOnce(OPEN_STORY_FINISHED, (handlerResolve, _, __, error) => {
      handlerResolve()
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
    request(window, OPEN_STORY_REQUESTED, storyPath)
  })
}

const showErrorAndCloseWindow = (dispatch, window, error) => {
  dispatch(removeWindow(window))
  dialog.showMessageBox({
    type: 'error',
    title: 'Die Geschichte konnte nicht geöffnet werden.',
    message: error,
    buttons: ['Schließen'],
    defaultId: 0
  }, () => window.destroy())
  dispatch(closeSplashScreen())
}

const showWindow = (dispatch, window) => {
  window.maximize()
  window.show()
  dispatch(closeSplashScreen())
}

export default handleReadyToShow
