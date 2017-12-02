import { mode, open } from '../shared/sqlite'

import InvalidStoryFileError from './invalid-story-file-error'
import Story from './story'
import UnsupportedStoryFileVersionError from './unsupported-story-file-version-error'
import { validatePath } from '../shared/validation'

const PLOTIFY_APPLICATION_ID = 80767984
const PLOTIFY_FILE_VERSION = 1

const openStory = async (path) => {
  validatePath(path)
  const database = await open(path, mode.OPEN_READWRITE)
  await validateApplicationId(database)
  await validateFileVersion(database)
  return new Story(path, database)
}

const validateApplicationId = async (database) => {
  const result = await database.get('PRAGMA application_id')
  const applicationId = result['application_id']
  if (applicationId !== PLOTIFY_APPLICATION_ID) {
    throw new InvalidStoryFileError('Invalid application id: ' + applicationId)
  }
}

const validateFileVersion = async (database) => {
  const result = await database.get('PRAGMA user_version')
  const userVersion = result['user_version']
  if (userVersion !== PLOTIFY_FILE_VERSION) {
    throw new UnsupportedStoryFileVersionError('Unsupported file version: ' + userVersion)
  }
}

export default openStory
