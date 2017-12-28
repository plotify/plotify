import { OPEN_STORY_FINISHED, OPEN_STORY_REQUESTED } from '../../../shared/story/requests'
import { getWindowStoryPath, removeWindow, setWindowIsReady } from '../windows'
import { request, requestHandlerOnce } from '../../shared/communication'

import { closeSplashScreen } from '../../splash-screen'
import { dialog } from 'electron'

const handleReadyToShow = (event) => {
  const window = event.sender
  const storyPath = getWindowStoryPath(window)
  setWindowIsReady(window)
  if (storyPath !== '') {
    openStory(window, storyPath)
      .then(() => showWindow(window))
      .catch((error) => showErrorAndCloseWindow(window, error))
  } else {
    showWindow(window)
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

const showErrorAndCloseWindow = (window, error) => {
  removeWindow(window)
  dialog.showMessageBox({
    type: 'error',
    title: 'Die Geschichte konnte nicht geöffnet werden.',
    message: error,
    buttons: ['Schließen'],
    defaultId: 0
  }, () => window.destroy())
  closeSplashScreen()
}

const showWindow = (window) => {
  window.maximize()
  window.show()
  closeSplashScreen()
}

export default handleReadyToShow
