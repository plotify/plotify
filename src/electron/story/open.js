import { InvalidStoryFileError, UnsupportedStoryFileVersionError, openStory } from '../../backend/story'
import { app, dialog } from 'electron'
import { createOrFocus, getWindowStoryPath, setWindowStoryPath } from '../windows'
import { getStoryByWindow, isLoadingStory, setLoadingStory, setStoryOfWindow } from './current'

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
    const files = dialog.showOpenDialog(senderWindow, options)
    if (!files) {
      return
    }
    path = files[0]
  }

  // Kann in diesem Fenster eine Geschichte geöffnet werden oder muss ein anderes Fenster verwendet werden?
  const senderWindowPath = getWindowStoryPath(senderWindow)
  if (senderWindowPath !== '' && senderWindowPath !== path) {
    createOrFocus(path)
    return
  }

  // Wird die Geschichte in diesem Fenster bereits geladen oder ist bereits geöffnet?
  if (senderWindowPath === path && (isLoadingStory(senderWindow) || getStoryByWindow(senderWindow) !== undefined)) {
    return
  }

  setWindowStoryPath(senderWindow, path)
  setLoadingStory(senderWindow, true)

  try {
    const story = await openStory(path)
    setStoryOfWindow(senderWindow, story)
    return story
  } catch (error) {
    setWindowStoryPath(senderWindow, '')
    throw errorMessage(error)
  } finally {
    setLoadingStory(senderWindow, false)
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
