import { mode, open } from '../shared/sqlite'

import fs from 'fs-extra'
import path from 'path'

const statementsFile = path.join(__dirname, 'create.sql')

const create = async (path) => {
  try {
    const statements = await fs.readFile(statementsFile, 'utf-8')
    const database = await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
    await database.exec(statements)
    await database.close()
  } catch (error) {
    throw error
  }
}

export default create
