import { validateDatabase } from '../shared/validation'

const sql = `
  SELECT c.id
  FROM character_history AS h, character AS c
  WHERE c.presence_history_id = h.id AND
        h.deleted = ? AND
        h.name LIKE ?
`

const find = async (database, deleted, filter = undefined) => {
  validateDatabase(database)
  const params = [toDeleted(deleted), toFilter(filter)]
  const rows = await database.all(sql, params)
  return rows.map(toIds)
}

const toDeleted = (deleted) => (
  deleted ? 1 : 0
)

const toFilter = (filter) => {
  if (filter === undefined) {
    return '%'
  } else {
    return '%' + filter + '%'
  }
}

const toIds = (row) => {
  return row.id
}

export default find
