import { validateDatabase } from '../shared/validation'

const selectGroupsSql = `
  SELECT g.id, h.title, h.deleted
  FROM entry_group AS g, entry_group_history AS h
  WHERE g.character_id = ? AND g.presence_history_id = h.id AND h.deleted = 0
  ORDER BY h.position ASC
`

const selectEntriesSql = `
  SELECT e.id, h.title, h.value, h.deleted
  FROM entry AS e, entry_history AS h
  WHERE e.character_id = ? AND e.presence_history_id = h.id AND h.group_id = ? AND h.deleted = 0
  ORDER BY h.position ASC
`

// TODO Read lock für alle Abfragen
const getProfile = async (database, characterId) => {
  validateDatabase(database)
  const selectGroupsParams = [characterId]
  const groupRows = await database.all(selectGroupsSql, selectGroupsParams)
  return Promise.all(groupRows.map((group) => toGroup(database, characterId, group)))
}

const toGroup = async (database, characterId, group) => {
  const selectEntriesParams = [characterId, group.id]
  const entries = await database.all(selectEntriesSql, selectEntriesParams)
  return {
    id: group.id,
    title: group.title,
    entries: entries.map(toEntry)
  }
}

const toEntry = (entry) => {
  return {
    id: entry.id,
    title: entry.title,
    value: entry.value
  }
}

export default getProfile
