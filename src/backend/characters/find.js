import { validateDatabase } from '../shared/validation'

const sql =
  'SELECT c.id AS id, h.name AS name, h.deleted AS deleted ' +
  'FROM character_history AS h, character AS c             ' +
  'WHERE c.presence_history_id = h.id AND h.deleted = ?;   '

const find = async (database, deleted, filter = undefined) => {
  validateDatabase(database)
  const params = [deleted ? 1 : 0]
  const rows = await database.all(sql, params)
  return rows.map(toCharacter).filter(createFilter(filter))
}

const toCharacter = (row) => ({
  id: row.id,
  name: row.name,
  deleted: row.deleted
})

const createFilter = (filter) => {
  if (filter !== undefined && filter.length > 0) {
    return (character) => character.name.toLowerCase().includes(filter)
  } else {
    return (character) => true
  }
}

export default find