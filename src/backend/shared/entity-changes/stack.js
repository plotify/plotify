import { validateType } from './type'

export const Stack = Object.freeze({
  PAST: 0,
  FUTURE: 1
})

const topSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    SELECT ${entityId} AS entityId, stack, position, type, type_id AS typeId, history_id AS historyId
    FROM ${sequenceTable}
    WHERE ${entityId}  = ? AND stack = ? AND position = (
      SELECT max(position)
      FROM ${sequenceTable}
      WHERE ${entityId} = ? AND stack = ?
    )
  `
}

const removeSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
  DELETE FROM ${sequenceTable}
  WHERE ${entityId} = ? AND
        stack = ? AND
        position = ? AND
        type = ? AND
        type_id = ? AND
        history_id = ?
  `
}

export const getStackTop = async (database, type, entityId, stack) => {
  validateType(type)
  const sql = topSql(type)
  const params = [entityId, stack, entityId, stack]
  return database.get(sql, params)
}

export const removeFromStack = async (database, type, entry) => {
  validateType(type)
  const sql = removeSql(type)
  const params = [
    entry.entityId,
    entry.stack,
    entry.position,
    entry.type,
    entry.typeId,
    entry.historyId
  ]
  return database.run(sql, params)
}
