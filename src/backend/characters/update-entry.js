import { ENTRY_TYPE } from './types'
import { addChange } from '../shared/entity-changes'
import uuid from 'uuid/v4'
import { validateDatabase } from '../shared/validation'

const currentSql = `
  SELECT h.group_id AS groupId, h.title, h.value, h.position, h.deleted,
         e.character_id AS characterId
  FROM ${ENTRY_TYPE.historyTable} AS h,
       ${ENTRY_TYPE.entityTable} AS e
  WHERE e.id = ? AND h.id = e.presence_history_id
`

const addSql = `
  INSERT INTO ${ENTRY_TYPE.historyTable}
  (id, group_id, title, value, position, deleted)
  VALUES (?, ?, ?, ?, ?, ?)
`

const updateEntry = async (database, entry) => {
  validateDatabase(database)
  validateEntry(entry)
  const transaction = await database.beginTransaction()
  try {
    const historyId = uuid()
    const currentEntry = await getCurrentEntry(transaction, entry)
    const updatedEntry = { ...currentEntry, ...entry, id: historyId }
    if (containsChanges(currentEntry, updatedEntry)) {
      await addHistoryEntry(transaction, updatedEntry)
      await addChange(transaction, ENTRY_TYPE, currentEntry.characterId, entry.id, historyId)
      await transaction.commit()
    } else {
      await transaction.rollback()
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validateEntry = (entry) => {
  if (typeof entry.id !== 'string' || entry.id.length === 0) {
    throw new TypeError('Missing entry id.')
  }
}

const getCurrentEntry = async (transaction, entry) => {
  const params = [entry.id]
  return transaction.get(currentSql, params)
}

const containsChanges = (currentEntry, updatedEntry) => (
  currentEntry.value !== updatedEntry.value ||
  currentEntry.position !== updatedEntry.position ||
  currentEntry.groupId !== updatedEntry.groupId ||
  currentEntry.title !== updatedEntry.title ||
  currentEntry.deleted !== updatedEntry.deleted
)

const addHistoryEntry = async (transaction, entry) => {
  const params = [entry.id, entry.groupId, entry.title, entry.value, entry.position, entry.deleted]
  return transaction.run(addSql, params)
}

export default updateEntry
