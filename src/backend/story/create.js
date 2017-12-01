import { mode, open } from '../shared/sqlite'

import Story from './story'
import fs from 'fs-extra'
import path from 'path'

const statementsFile = path.join(__dirname, 'create.sql')

const create = async (path) => {
  const statements = await fs.readFile(statementsFile, 'utf-8')
  const database = await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
  await database.exec(statements)
  return new Story(path, database)
}

export default create
