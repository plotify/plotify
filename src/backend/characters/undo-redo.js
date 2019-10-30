import { CHARACTER_ENTRY_CHANGED, CHARACTER_ENTRY_GROUP_CHANGED, CHARACTER_NAME_CHANGED } from '../../shared/characters/changes'
import { CHARACTER_TYPE, ENTRY_GROUP_TYPE, ENTRY_TYPE, TYPES } from './types'
import { canRedo as _canRedo, canUndo as _canUndo, redo as _redo, undo as _undo } from '../shared/entity-changes'

import { validateDatabase } from '../shared/validation'

export const canUndo = async (database, characterId) => {
  validateDatabase(database)
  return _canUndo(database, TYPES, characterId)
}

export const canRedo = async (database, characterId) => {
  validateDatabase(database)
  return _canRedo(database, TYPES, characterId)
}

export const undo = async (database, characterId) => {
  validateDatabase(database)
  const changes = await _undo(database, TYPES, characterId)
  return createResult(database, characterId, changes)
}

export const redo = async (database, characterId) => {
  validateDatabase(database)
  const changes = await _redo(database, TYPES, characterId)
  return createResult(database, characterId, changes)
}

const createResult = async (database, characterId, changes) => ({
  characterId,
  type: getChangesType(changes),
  entity: {
    id: changes.typeId,
    ...await getEntityAttributes(database, changes)
  }
})

const getChangesType = (changes) => {
  switch (changes.type.id) {
    case CHARACTER_TYPE.id:
      return CHARACTER_NAME_CHANGED
    case ENTRY_GROUP_TYPE.id:
      return CHARACTER_ENTRY_GROUP_CHANGED
    case ENTRY_TYPE.id:
      return CHARACTER_ENTRY_CHANGED
    default:
      throw new Error('Unknown type: ' + changes.type.id)
  }
}

const characterSql = `
  SELECT name, deleted
  FROM character_history
  WHERE id = ?
`

const entryGroupSql = `
  SELECT title, position, deleted
  FROM entry_group_history
  WHERE id = ?
`

const entrySql = `
  SELECT group_id AS groupId, title, value, position, deleted
  FROM entry_history
  WHERE id = ?
`

const getEntityAttributes = async (database, changes) => {
  switch (changes.type.id) {
    case CHARACTER_TYPE.id:
      return toCharacter(await database.get(characterSql, [changes.historyId]))
    case ENTRY_GROUP_TYPE.id:
      return toEntryGroup(await database.get(entryGroupSql, [changes.historyId]))
    case ENTRY_TYPE.id:
      return toEntry(await database.get(entrySql, [changes.historyId]))
    default:
      throw new Error('Unknown type: ' + changes.type.id)
  }
}

const toCharacter = (row) => ({
  name: row.name,
  deleted: row.deleted === 1
})

const toEntryGroup = (row) => ({
  title: row.title,
  position: row.position,
  deleted: row.deleted === 1
})

const toEntry = (row) => ({
  groupId: row.groupId,
  title: row.title,
  value: row.value,
  position: row.position,
  deleted: row.deleted === 1
})
