import { InvalidStoryFileError, UnsupportedStoryFileVersionError, openStory } from '../../backend/story'
import { app, dialog } from 'electron'
import { getCurrentStory, setCurrentStory } from './current'

import { getMainWindow } from '../main-window'

const options = {
  title: 'Geschichte öffnen',
  defaultPath: app.getPath('documents'),
  properties: ['openFile'],
  filters: [
    { name: 'Plotify Geschichte', extensions: ['story'] }
  ]
}

const open = async (path) => {
  if (path === undefined) {
    const files = dialog.showOpenDialog(getMainWindow(), options)
    if (!files) {
      return
    }
    path = files[0]
  }

  const currentPath = getCurrentStory() ? getCurrentStory().path : undefined
  if (path === currentPath) {
    return
  }

  try {
    const story = await openStory(path)
    await closeCurrentStory()
    setCurrentStory(story)
    return story
  } catch (error) {
    throw errorMessage(error)
  }
}

// TODO Sicherstellen, dass noch ungespeicherte Änderungen gespeichert werden.
const closeCurrentStory = async () => {
  const currentStory = getCurrentStory()
  if (currentStory) {
    await currentStory.database.close()
  }
}

const INVALID_FILE_ERROR_MESSAGE =
  'Die ausgewählte Datei ist keine Geschichte, die mit Plotify erstellt wurde. '
const UNSUPPORTED_FILE_VERSION_ERROR_MESSAGE =
  'Die ausgewählte Datei wurde mit einer neueren Version von Plotify erstellt. ' +
  'Bitte aktualisiere Plotify, um die Geschichte öffnen und bearbeiten zu können.'

const errorMessage = (error) => {
  let message

  if (error instanceof InvalidStoryFileError) {
    message = INVALID_FILE_ERROR_MESSAGE
  } else if (error instanceof UnsupportedStoryFileVersionError) {
    message = UNSUPPORTED_FILE_VERSION_ERROR_MESSAGE
  } else {
    message = error.message
  }

  return new Error(message)
}

export default open
