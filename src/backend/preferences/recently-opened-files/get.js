import { validateDatabase } from '../../shared/validation'

const getSql = `
  SELECT path, last_opened AS lastOpened, pinned
  FROM recently_opened_files
  ORDER BY pinned DESC, last_opened DESC
`

const get = async (database) => {
  validateDatabase(database)
  const result = await database.all(getSql)
  return result.map((row) => ({
    path: row.path,
    lastOpened: row.lastOpened,
    pinned: row.pinned === 1
  }))
}

export default get
