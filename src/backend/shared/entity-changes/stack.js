import { validateType } from './type'

export const Stack = Object.freeze({
  PAST: 0,
  FUTURE: 1
})

const emptySql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    SELECT position
    FROM ${sequenceTable}
    WHERE ${entityId} = ? AND stack = ?
    LIMIT 1
  `
}

const topSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    SELECT ${entityId} AS entityId, stack, position, type, type_id AS typeId, history_id AS historyId
    FROM ${sequenceTable}
    WHERE ${entityId} = ? AND stack = ? AND position = (
      SELECT max(position)
      FROM ${sequenceTable}
      WHERE ${entityId} = ? AND stack = ?
    )
  `
}

const topPositionSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    SELECT max(position) AS maxPosition
    FROM ${sequenceTable}
    WHERE ${entityId} = ? AND stack = ?
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

const stackSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    SELECT ${entityId} AS entityId, stack, position, type,
           type_id AS typeId, history_id AS historyId
    FROM ${sequenceTable}
    WHERE ${entityId} = ? AND stack = ?
    ORDER BY position ASC
  `
}

const addSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    INSERT INTO ${sequenceTable}
    (position, ${entityId}, type, type_id, history_id, stack)
    VALUES (?, ?, ?, ?, ?, ?)
  `
}

const deleteSql = (type) => {
  const sequenceTable = type.sequenceTable.name
  const entityId = type.sequenceTable.entityIdColumn
  return `
    DELETE FROM ${sequenceTable}
    WHERE ${entityId} = ? AND stack = ?
  `
}

export const isStackEmpty = async (stack, database, type, entityId) => {
  validateType(type)
  const sql = emptySql(type)
  const params = [entityId, stack]
  return await database.get(sql, params) === undefined
}

export const getStackTop = async (stack, database, type, entityId) => {
  validateType(type)
  const sql = topSql(type)
  const params = [entityId, stack, entityId, stack]
  return database.get(sql, params)
}

export const getStackTopPosition = async (stack, database, type, entityId) => {
  validateType(type)
  const sql = topPositionSql(type)
  const params = [entityId, stack]
  const result = await database.get(sql, params)
  return result.maxPosition
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

export const getStack = async (stack, database, type, entityId) => {
  validateType(type)
  const sql = stackSql(type)
  const params = [entityId, stack]
  return database.all(sql, params)
}

export const pushToStack = async (stack, database, type, entityId, typeId, historyId) => {
  validateType(type)
  const topPosition = await getStackTopPosition(stack, database, type, entityId)
  const nextPosition = topPosition === null ? 0 : topPosition + 1
  const sql = addSql(type)
  const params = [nextPosition, entityId, type.id, typeId, historyId, stack]
  await database.run(sql, params)
  return nextPosition
}

export const deleteStack = async (stack, database, type, entityId) => {
  validateType(type)
  const sql = deleteSql(type)
  const params = [entityId, stack]
  return database.run(sql, params)
}
