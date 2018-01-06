import { Stack, deleteStack, getStack, pushToStack } from './stack'
import { getPresenceHistoryId, setPresenceHistoryId } from './presence-history-id'

const addChange = async (transaction, type, entityId, typeId, historyId) => {
  const prevHistoryId = await getPresenceHistoryId(transaction, type, typeId)
  await setPresenceHistoryId(transaction, type, typeId, historyId)
  await modifyChangeSequence(transaction, type, entityId, typeId, prevHistoryId)
}

const modifyChangeSequence = async (transaction, type, entityId, typeId, prevHistoryId) => {
  await pushToStack(Stack.PAST, transaction, type, entityId, typeId, prevHistoryId)
  const futureStack = await getStack(Stack.FUTURE, transaction, type, entityId)
  if (futureStack.length > 0) {
    await handleFuture(transaction, type, entityId, typeId, prevHistoryId, futureStack)
  }
}

const handleFuture = async (transaction, type, entityId, typeId, prevHistoryId, futureStack) => {
  await pushTopToBottomFutureToPast(transaction, type, futureStack)
  await pushSecondFromBottomFutureToPast(transaction, type, futureStack)
  await pushToStack(Stack.PAST, transaction, type, entityId, typeId, prevHistoryId)
  await deleteStack(Stack.FUTURE, transaction, type, entityId)
}

const pushTopToBottomFutureToPast = async (transaction, type, futureStack) => {
  for (let index = futureStack.length - 1; index >= 0; index--) {
    await pushEntryToPastStack(transaction, type, futureStack[index])
  }
}

const pushSecondFromBottomFutureToPast = async (transaction, type, futureStack) => {
  for (let index = 1; index < futureStack.length; index++) {
    await pushEntryToPastStack(transaction, type, futureStack[index])
  }
}

const pushEntryToPastStack = async (transaction, type, entry) => {
  const entryType = { ...type, id: entry.type } // Temporary invalid type.
  await pushToStack(Stack.PAST, transaction, entryType, entry.entityId, entry.historyId)
}

export default addChange
