import { InvalidStoryFileError, UnsupportedStoryFileVersionError, openStory } from '../../backend/story'
import { app, dialog } from 'electron'
import { getStoryByWindow, setStoryOfWindow } from './current'

import { getMainWindow } from '../main-window'

const options = {
  title: 'Geschichte öffnen',
  defaultPath: app.getPath('documents'),
  properties: ['openFile'],
  filters: [
    { name: 'Plotify Geschichte', extensions: ['story'] }
  ]
}

const open = async (senderWindow, path) => {
  if (path === undefined) {
    const files = dialog.showOpenDialog(getMainWindow(), options)
    if (!files) {
      return
    }
    path = files[0]
  }

  const currentPath = getStoryByWindow(senderWindow) ? getStoryByWindow(senderWindow).path : undefined
  if (path === currentPath) {
    return
  }

  try {
    const story = await openStory(path)
    await closeCurrentStory(senderWindow)
    setStoryOfWindow(senderWindow, story)
    return story
  } catch (error) {
    throw errorMessage(error)
  }
}

// TODO Sicherstellen, dass noch ungespeicherte Änderungen gespeichert werden.
const closeCurrentStory = async (senderWindow) => {
  const currentStory = getStoryByWindow(senderWindow)
  if (currentStory) {
    await currentStory.database.close()
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
