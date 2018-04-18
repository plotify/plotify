import { InvalidStoryFileError, UnsupportedStoryFileVersionError, openStory } from '../../backend/story'
import { OPEN_STORY_FAILED, OPEN_STORY_STARTED, OPEN_STORY_SUCCESSFUL } from '../../shared/story/requests'
import { addLoadingStory, removeStoryByWindowId, setStoryLoaded } from './actions'
import { createOrFocus, getWindowByStoryPath, getWindowStoryPath, isWindowReady, setWindowStoryPath } from '../windows'
import { getStoryByWindowId, isStoryLoading } from './selectors'
import { showMessageBox, showOpenDialog } from '../shared/dialog'

import { addOrUpdateRecentlyOpenedFile } from '../preferences'
import { app } from 'electron'
import { request } from '../shared/communication'

const options = {
  title: 'Geschichte öffnen',
  defaultPath: app.getPath('documents'),
  properties: ['openFile'],
  filters: [
    { name: 'Plotify Geschichte', extensions: ['story'] }
  ]
}

const open = (senderWindow, path) => async (dispatch, getState) => {
  if (path === undefined) {
    const files = await showOpenDialog(senderWindow, options)
    if (!files) {
      return false
    }
    path = files[0]
  }

  // Wenn kein Fenster übergeben wurde wird die Geschichte in einem neuen Fenster geöffnet.
  if (!senderWindow) {
    dispatch(createOrFocus(path))
    return false
  }

  // Kann in diesem Fenster eine Geschichte geöffnet werden oder muss ein anderes Fenster verwendet werden?
  const senderWindowPath = getWindowStoryPath(getState(), senderWindow.id)
  if (senderWindowPath !== '' && senderWindowPath !== path) {
    dispatch(createOrFocus(path))
    return false
  }

  // Wird die Geschichte in einem anderen Fenster bereits geladen oder ist bereits geöffnet?
  const otherWindow = getWindowByStoryPath(getState(), path)
  if (senderWindow !== otherWindow && otherWindow !== undefined) {
    dispatch(createOrFocus(path))
    return false
  }

  // Wird die Geschichte in diesem Fenster bereits geladen oder ist bereits geöffnet?
  if (senderWindowPath === path &&
        (isStoryLoading(getState(), path) || getStoryByWindowId(getState(), senderWindow.id) !== undefined)) {
    return false
  }

  await request(senderWindow, OPEN_STORY_STARTED, path)
  dispatch(setWindowStoryPath(senderWindow.id, path))
  dispatch(addLoadingStory(path, senderWindow.id))

  try {
    const story = await openStory(path)
    dispatch(setStoryLoaded(path, story))
    dispatch(addOrUpdateRecentlyOpenedFile({ path, lastOpened: new Date().toISOString() }))
    await request(senderWindow, OPEN_STORY_SUCCESSFUL, path)
    return true
  } catch (error) {
    dispatch(setWindowStoryPath(senderWindow.id, ''))
    dispatch(removeStoryByWindowId(senderWindow.id))
    request(senderWindow, OPEN_STORY_FAILED, path)

    const errorMessage = createErrorMessage(error)
    await showErrorDialog(errorMessage, isWindowReady(getState(), senderWindow.id) ? senderWindow : null)

    return false
  }
}

const INVALID_FILE_ERROR_MESSAGE =
  'Die ausgewählte Datei ist keine Geschichte, die mit Plotify erstellt wurde. '
const UNSUPPORTED_FILE_VERSION_ERROR_MESSAGE =
  'Die ausgewählte Datei wurde mit einer neueren Version von Plotify erstellt. ' +
  'Bitte aktualisiere Plotify, um die Geschichte öffnen und bearbeiten zu können.'
const CANT_OPEN_FILE_ERROR_MESSAGE =
  'Die ausgewählte Datei konnte nicht geöffnet werden. ' +
  'Existiert die Datei und hast du die notwendigen Berechtigungen, um auf die Datei zuzugreifen?'

const createErrorMessage = (error) => {
  let message

  if (error instanceof InvalidStoryFileError) {
    message = INVALID_FILE_ERROR_MESSAGE
  } else if (error instanceof UnsupportedStoryFileVersionError) {
    message = UNSUPPORTED_FILE_VERSION_ERROR_MESSAGE
  } else if (error.message.startsWith('SQLITE_CANTOPEN')) {
    message = CANT_OPEN_FILE_ERROR_MESSAGE
  } else {
    message = error.message
  }

  return message
}

const showErrorDialog = (message, parentWindow) => {
  return showMessageBox(parentWindow, {
    type: 'error',
    title: 'Die Geschichte konnte nicht geöffnet werden.',
    message: message,
    buttons: ['Schließen'],
    defaultId: 0,
    noLink: true
  })
}

export default open
