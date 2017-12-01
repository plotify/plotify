import { mode, open } from '../shared/sqlite'

import Story from './story'
import { validatePath } from '../shared/validation'

const openStory = async (path) => {
  validatePath(path)
  const database = await open(path, mode.OPEN_READWRITE)
  return new Story(path, database)
}

export default openStory
