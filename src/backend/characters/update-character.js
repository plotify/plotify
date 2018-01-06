import { CHARACTER_TYPE } from './types'
import { addChange } from '../shared/entity-changes'
import uuid from 'uuid/v4'
import { validateDatabase } from '../shared/validation'

const currentSql = `
  SELECT h.name, h.deleted
  FROM ${CHARACTER_TYPE.historyTable} AS h,
       ${CHARACTER_TYPE.entityTable} AS c
  WHERE c.id = ? AND h.id = c.presence_history_id
`

const addSql = `
  INSERT INTO ${CHARACTER_TYPE.historyTable}
  (id, name, deleted)
  VALUES (?, ?, ?)
`

const updateCharacter = async (database, character) => {
  validateDatabase(database)
  validateCharacter(character)
  const transaction = await database.beginTransaction()
  try {
    const historyId = uuid()
    const currentCharacter = await getCurrentCharacter(transaction, character)
    const updatedCharacter = { ...currentCharacter, ...character, id: historyId }
    if (containsChanges(currentCharacter, updatedCharacter)) {
      await addHistoryEntry(transaction, updatedCharacter)
      await addChange(transaction, CHARACTER_TYPE, character.id, character.id, historyId)
      await transaction.commit()
    } else {
      await transaction.rollback()
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const validateCharacter = (character) => {
  if (typeof character.id !== 'string' || character.id.length === 0) {
    throw new TypeError('Missing character id.')
  }
}

const getCurrentCharacter = async (transaction, character) => {
  const params = [character.id]
  const result = await transaction.get(currentSql, params)
  if (character) {
    return {
      ...result,
      deleted: result.deleted === 1
    }
  }
}

const containsChanges = (currentCharacter, updatedCharacter) => (
  currentCharacter.name !== updatedCharacter.name ||
  currentCharacter.deleted !== updatedCharacter.deleted
)

const addHistoryEntry = async (transaction, character) => {
  const params = [character.id, character.name, character.deleted ? 1 : 0]
  return transaction.run(addSql, params)
}

export default updateCharacter
