import { InvalidStoryFileError, UnsupportedStoryFileVersionError, openStory } from '../../backend/story'
import { addLoadingStory, removeStoryByWindowId, setStoryLoaded, storyOpened } from './actions'
import { app, dialog } from 'electron'
import { createOrFocus, getWindowByStoryPath, getWindowStoryPath, setWindowStoryPath } from '../windows'
import { getStoryByWindowId, isStoryLoading } from './selectors'

import { addOrUpdateRecentlyOpenedFile } from '../preferences'

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
    const files = dialog.showOpenDialog(senderWindow, options)
    if (!files) {
      return
    }
    path = files[0]
  }

  // Kann in diesem Fenster eine Geschichte geöffnet werden oder muss ein anderes Fenster verwendet werden?
  const senderWindowPath = getWindowStoryPath(getState(), senderWindow.id)
  if (senderWindowPath !== '' && senderWindowPath !== path) {
    dispatch(createOrFocus(path))
    return
  }

  // Wird die Geschichte in einem anderen Fenster bereits geladen oder ist bereits geöffnet?
  const otherWindow = getWindowByStoryPath(getState(), path)
  if (senderWindow !== otherWindow && otherWindow !== undefined) {
    dispatch(createOrFocus(path))
    return
  }

  // Wird die Geschichte in diesem Fenster bereits geladen oder ist bereits geöffnet?
  if (senderWindowPath === path &&
        (isStoryLoading(getState(), path) || getStoryByWindowId(getState(), senderWindow.id) !== undefined)) {
    return
  }

  dispatch(setWindowStoryPath(senderWindow.id, path))
  dispatch(addLoadingStory(path, senderWindow.id))

  try {
    const story = await openStory(path)
    dispatch(setStoryLoaded(path, story))
    dispatch(storyOpened(path))
    addOrUpdateRecentlyOpenedFile({ path, lastOpened: new Date().toISOString() }) // Asynchron: Soll das Öffnen der Geschichte nicht verzögern oder verhindern.
    return story
  } catch (error) {
    dispatch(setWindowStoryPath(senderWindow.id, ''))
    dispatch(removeStoryByWindowId(senderWindow.id))
    throw errorMessage(error)
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

const errorMessage = (error) => {
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

  return new Error(message)
}

export default open
