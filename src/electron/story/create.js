import { CREATE_STORY_FAILED, CREATE_STORY_STARTED, CREATE_STORY_SUCCESSFUL } from '../../shared/story/requests'
import { closeSplashScreen, showSplashScreen } from '../splash-screen'
import { existsSync, unlink } from 'fs-extra'
import { showMessageBox, showSaveDialog } from '../shared/dialog'

import { app } from 'electron'
import { createStory } from '../../backend/story'
import { extname } from 'path'
import { getStoryPaths } from './selectors'
import { getWindowStoryPath } from '../windows'
import openStory from './open'
import { request } from '../shared/communication'

const options = {
  title: 'Neue Geschichte',
  defaultPath: app.getPath('documents'),
  filters: [
    { name: 'Plotify Geschichte', extensions: ['story'] }
  ]
}

const create = (senderWindow) => async (dispatch, getState) => {
  const file = await showSaveDialog(senderWindow, options)
  if (!file) {
    return false
  }

  const path = createStoryPath(file)
  if (isStoryOpen(getState(), path)) {
    await showErrorDialog(OVERWRITE_FILE_ERROR_MESSAGE, senderWindow)
    return false
  }

  const openStoryInExistingWindow = senderWindow && getWindowStoryPath(getState(), senderWindow.id) === ''
  if (openStoryInExistingWindow) {
    await request(senderWindow, CREATE_STORY_STARTED, path)
  } else {
    dispatch(showSplashScreen())
  }

  try {
    await deleteFileIfExists(path)
    const story = await createStory(path)
    await story.database.close()

    const result = await dispatch(openStory(senderWindow, path))

    // Das Erstellen einer Geschichte ist erst dann abgeschlossen, wenn die Geschichte auch geöffnet wurde.
    if (openStoryInExistingWindow) {
      request(senderWindow, CREATE_STORY_SUCCESSFUL, path)
    }

    return result
  } catch (error) {
    if (openStoryInExistingWindow) {
      request(senderWindow, CREATE_STORY_FAILED, path)
    }

    const errorMessage = createErrorMessage(error)
    await showErrorDialog(errorMessage, senderWindow)
    return false
  } finally {
    if (!openStoryInExistingWindow) {
      dispatch(closeSplashScreen())
    }
  }
}

const OVERWRITE_FILE_ERROR_MESSAGE =
  'Die aktuell geöffnete Geschichte kann nicht überschrieben werden. ' +
  'Bitte schließe die Geschichte, um sie überschreiben zu können.'
const CANT_OVERWRITE_FILE_ERROR_MESSAGE =
  'Die ausgewählte Datei konnte nicht überschrieben werden. ' +
  'Hast du die notwendigen Berechtigungen, um die Datei zu überschreiben?'
const CANT_CREATE_FILE_ERROR_MESSAGE =
  'Die Datei für die Geschichte konnte nicht erstellt werden. ' +
  'Hast du die notwendigen Berechtigungen, um eine Datei in dem ausgewählten Verzeichnis zu erstellen?'

const createStoryPath = (path) => {
  if (extname(path) === '.story') {
    return path
  } else {
    return path + '.story'
  }
}

const isStoryOpen = (state, path) => {
  for (let storyPath of getStoryPaths(state)) {
    if (path === storyPath) {
      return true
    }
  }
  return false
}

const deleteFileIfExists = async (path) => {
  try {
    if (existsSync(path)) {
      await unlink(path)
    }
  } catch (error) {
    throw new Error(CANT_OVERWRITE_FILE_ERROR_MESSAGE)
  }
}

const createErrorMessage = (error) => {
  let message

  if (error.message.startsWith('SQLITE_CANTOPEN')) {
    message = CANT_CREATE_FILE_ERROR_MESSAGE
  } else {
    message = error.message
  }

  return message
}

const showErrorDialog = (message, parentWindow) => {
  return showMessageBox(parentWindow, {
    type: 'error',
    title: 'Die Geschichte konnte nicht erstellt werden.',
    message: message,
    buttons: ['Schließen'],
    defaultId: 0,
    noLink: true
  })
}

export default create
