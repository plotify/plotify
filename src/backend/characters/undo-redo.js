import { canRedo as _canRedo, canUndo as _canUndo, redo as _redo, undo as _undo } from '../shared/entity-changes'

import { TYPES } from './types'
import { validateDatabase } from '../shared/validation'

export const canUndo = async (database, characterId) => {
  validateDatabase(database)
  return _canUndo(database, TYPES, characterId)
}

export const undo = async (database, characterId) => {
  validateDatabase(database)
  return _undo(database, TYPES, characterId)
}

export const canRedo = async (database, characterId) => {
  validateDatabase(database)
  return _canRedo(database, TYPES, characterId)
}

export const redo = async (database, characterId) => {
  validateDatabase(database)
  return _redo(database, TYPES, characterId)
}
