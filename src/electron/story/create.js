import { app, dialog } from 'electron'
import { existsSync, unlink } from 'fs-extra'

import { createStory } from '../../backend/story'
import { extname } from 'path'
import { getStoryPaths } from './selectors'

const options = {
  title: 'Neue Geschichte',
  defaultPath: app.getPath('documents'),
  filters: [
    { name: 'Plotify Geschichte', extensions: ['story'] }
  ]
}

const create = (senderWindow) => async (_, getState) => {
  const file = dialog.showSaveDialog(senderWindow, options)
  if (!file) {
    return
  }

  let path
  if (extname(file) === '.story') {
    path = file
  } else {
    path = file + '.story'
  }
  checkCurrentStoryPath(path)

  try {
    await deleteFileIfExists(getState, path)
    const story = await createStory(path)
    await story.database.close()
    return story
  } catch (error) {
    throw errorMessage(error)
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

const checkCurrentStoryPath = (getState, path) => {
  for (let story of getStoryPaths(getState())) {
    if (path === story.path) {
      throw new Error(OVERWRITE_FILE_ERROR_MESSAGE)
    }
  }
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

const errorMessage = (error) => {
  let message

  if (error.message.startsWith('SQLITE_CANTOPEN')) {
    message = CANT_CREATE_FILE_ERROR_MESSAGE
  } else {
    message = error.message
  }

  return new Error(message)
}

export default create
