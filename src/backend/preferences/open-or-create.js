import { mode, open } from '../shared/sqlite'

import create from './create'
import { pathExists } from 'fs-extra'
import { validatePath } from '../shared/validation'

const openOrCreate = async (path) => {
  validatePath(path)
  if (await pathExists(path)) {
    return open(path, mode.OPEN_READWRITE)
  } else {
    return create(path)
  }
}

export default openOrCreate
