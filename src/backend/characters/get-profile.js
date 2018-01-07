import { validateDatabase } from '../shared/validation'

const groupsSql = `
  SELECT g.id, h.title
  FROM entry_group AS g, entry_group_history AS h
  WHERE g.character_id = ? AND g.presence_history_id = h.id AND h.deleted = 0
  ORDER BY h.position ASC
`

const entriesSql = `
  SELECT e.id, h.title, h.value, h.group_id AS groupId
  FROM entry AS e, entry_history AS h
  WHERE e.character_id = ? AND e.presence_history_id = h.id AND h.deleted = 0
  ORDER BY h.position ASC
`

const getProfile = async (database, characterId) => {
  validateDatabase(database)
  const allGroups = await getGroups(database, characterId)
  const allEntries = await getEntries(database, characterId)
  const groupOrder = toGroupOrder(allGroups)
  const groups = toGroups(allGroups)
  const entries = toEntries(allEntries)
  addEntriesToGroups(allEntries, groups)
  return {
    id: characterId,
    groupOrder,
    groups,
    entries
  }
}

const getGroups = async (database, characterId) => {
  const params = [characterId]
  return database.all(groupsSql, params)
}

const getEntries = async (database, characterId) => {
  const params = [characterId]
  return database.all(entriesSql, params)
}

const toGroupOrder = (groups) => {
  return groups.map(group => group.id)
}

const toGroups = (groups) => {
  return groups.reduce((map, group) => {
    const id = group.id
    const title = group.title
    const entries = []
    map[id] = { id, title, entries }
    return map
  }, {})
}

const toEntries = (entries) => {
  return entries.reduce((map, entry) => {
    const id = entry.id
    const title = entry.title
    const value = entry.value
    map[id] = { id, title, value }
    return map
  }, {})
}

const addEntriesToGroups = (entries, groups) => {
  for (const entry of entries) {
    const entryId = entry.id
    const groupId = entry.groupId
    groups[groupId].entries.push(entryId)
  }
}

export default getProfile
