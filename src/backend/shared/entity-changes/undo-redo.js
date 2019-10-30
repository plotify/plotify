import { Stack, getStackTop, isStackEmpty, pushToStack, removeFromStack } from './stack'
import { getPresenceHistoryId, setPresenceHistoryId } from './presence-history-id'

export const canUndo = async (transaction, types, entityId) => {
  return !await isStackEmpty(Stack.PAST, transaction, types[0], entityId)
}

export const canRedo = async (transaction, types, entityId) => {
  return !await isStackEmpty(Stack.FUTURE, transaction, types[0], entityId)
}

export const undo = async (transaction, types, entityId) => {
  if (!await canUndo(transaction, types, entityId)) {
    throw new Error('There are no changes that can be undone. Entity ID: ' + entityId)
  }
  return base(Stack.PAST, Stack.FUTURE, transaction, types, entityId)
}

export const redo = async (transaction, types, entityId) => {
  if (!await canRedo(transaction, types, entityId)) {
    throw new Error('There are no changes that can be redone. Entity ID: ' + entityId)
  }
  return base(Stack.FUTURE, Stack.PAST, transaction, types, entityId)
}

const base = async (sourceStack, targetStack, transaction, types, entityId) => {
  // Nehme die letzte überschriebene Information vom Source-Stapel:
  const newPresence = await getStackTop(sourceStack, transaction, types[0], entityId)
  const type = types[newPresence.type]
  const typeId = newPresence.typeId
  await removeFromStack(transaction, type, newPresence)

  // Stelle die letzte überschriebene Information wieder her:
  const previousPresenceHistoryId = await getPresenceHistoryId(transaction, type, typeId)
  await setPresenceHistoryId(transaction, type, typeId, newPresence.historyId)

  // Lege die zuvor aktuelle Information auf den Target-Stapel:
  await pushToStack(targetStack, transaction, type, entityId, typeId, previousPresenceHistoryId)

  return {
    type,
    typeId,
    historyId: newPresence.historyId
  }
}
