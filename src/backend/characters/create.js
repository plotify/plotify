import defaultProfile from './default-profile'
import uuid from 'uuid/v4'
import { validateDatabase } from '../shared/validation'

const insertCharacterHistorySql =
  'INSERT INTO character_history (id, name, deleted) VALUES (?, ?, ?)'
const insertCharacterSql =
  'INSERT INTO character (id, presence_history_id) VALUES (?, ?)'

const insertGroupHistorySql =
  'INSERT INTO entry_group_history (id, title, position, deleted) VALUES (?, ?, ?, ?)'
const insertGroupSql =
  'INSERT INTO entry_group (character_id, id, presence_history_id) VALUES (?, ?, ?)'

const insertEntryHistorySql =
  'INSERT INTO entry_history (id, group_id, title, value, position, deleted) VALUES (?, ?, ?, ?, ?, ?)'
const insertEntrySql =
  'INSERT INTO entry (character_id, id, presence_history_id) VALUES (?, ?, ?)'

const create = async (database, name) => {
  validateDatabase(database)
  const transaction = await database.beginTransaction()
  try {
    const characterId = uuid()
    await createCharacter(transaction, characterId, name)
    await createDefaultProfile(transaction, characterId)
    await transaction.commit()
    return characterId
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const createCharacter = async (transaction, characterId, name) => {
  const historyId = uuid()
  const insertCharacterHistoryParams = [historyId, name, 0]
  const insertCharacterParams = [characterId, historyId]
  await transaction.run(insertCharacterHistorySql, insertCharacterHistoryParams)
  await transaction.run(insertCharacterSql, insertCharacterParams)
}

const createDefaultProfile = async (transaction, characterId) => {
  for (let position = 0; position < defaultProfile.length; position++) {
    const group = defaultProfile[position]
    await createGroup(transaction, characterId, position, group.title, group.entries)
  }
}

const createGroup = async (transaction, characterId, position, title, entries) => {
  const groupId = uuid()
  const historyId = uuid()
  const insertGroupHistoryParams = [historyId, title, position, 0]
  const insertGroupParams = [characterId, groupId, historyId]
  await transaction.run(insertGroupHistorySql, insertGroupHistoryParams)
  await transaction.run(insertGroupSql, insertGroupParams)
  await createGroupEntries(transaction, characterId, groupId, entries)
}

const createGroupEntries = async (transaction, characterId, groupId, entries) => {
  for (let position = 0; position < entries.length; position++) {
    const title = entries[position]
    await createGroupEntry(transaction, characterId, groupId, position, title)
  }
}

const createGroupEntry = async (transaction, characterId, groupId, position, title) => {
  const entryId = uuid()
  const historyId = uuid()
  const insertEntryHistoryParams = [historyId, groupId, title, '', position, 0]
  const insertEntryParams = [characterId, entryId, historyId]
  await transaction.run(insertEntryHistorySql, insertEntryHistoryParams)
  await transaction.run(insertEntrySql, insertEntryParams)
}

export default create
