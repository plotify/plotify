import { validateDatabase } from '../../shared/validation'

const sql = `
  DELETE FROM recently_opened_files
  WHERE path = ?
`

const remove = async (database, path) => {
  validateDatabase(database)
  const params = [path]
  return database.run(sql, params)
}

export default remove
