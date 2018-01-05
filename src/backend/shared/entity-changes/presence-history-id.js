import { validateType } from './type'

const selectSql = (type) => `
  SELECT presence_history_id as presenceHistoryId
  FROM ${type.entityTable}
  WHERE id = ?
`

const setSql = (type) => `
  UPDATE ${type.entityTable}
  SET presence_history_id = ?
  WHERE id = ?
`

export const getPresenceHistoryId = async (database, type, typeId) => {
  validateType(type)
  const sql = selectSql(type)
  const params = [typeId]
  const result = await database.get(sql, params)
  return result.presenceHistoryId
}

export const setPresenceHistoryId = async (database, type, typeId, newHistoryId) => {
  validateType(type)
  const sql = setSql(type)
  const params = [newHistoryId, typeId]
  return database.run(sql, params)
}
