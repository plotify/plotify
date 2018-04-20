import { canUndo as _canUndo, undo as _undo } from '../shared/entity-changes'

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
