import { mode, open } from '../shared/sqlite'

import fs from 'fs-extra'
import path from 'path'
import { validateDatabase } from '../shared/validation'

const statementsFile = path.join(__dirname, 'create.sql')

export const create = async (path) => {
  const database = await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
  await createSchema(database)
  return database
}

export const createSchema = async (database) => {
  validateDatabase(database)
  const statements = await fs.readFile(statementsFile, 'utf-8')
  return database.exec(statements)
}
