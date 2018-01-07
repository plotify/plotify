import { validateDatabase } from '../shared/validation'

const sql = `
  SELECT c.id, h.name, h.deleted
  FROM character_history AS h, character AS c
  WHERE c.presence_history_id = h.id
`

const getCharacters = async (database) => {
  validateDatabase(database)
  const rows = await database.all(sql)
  return rows.reduce(toCharacter, {})
}

const toCharacter = (map, row) => {
  const id = row.id
  const name = row.name
  const deleted = row.deleted === 1
  map[id] = { id, name, deleted }
  return map
}

export default getCharacters
