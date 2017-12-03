import * as t from './actionTypes'

import { CHARACTERS_SECTION } from './constants'
import { setSection } from '../navigation/actions'

export const openCharactersSection = () => (
  setSection(CHARACTERS_SECTION)
)

export const openCreateCharacterDialog = () => ({
  type: t.OPEN_CREATE_CHARACTER_DIALOG,
  payload: {}
})

export const closeCreateCharacterDialog = () => ({
  type: t.CLOSE_CREATE_CHARACTER_DIALOG,
  payload: {}
})

export const createCharacter = (name) => ({
  type: t.CREATE_CHARACTER,
  payload: { name }
})

export const selectCharacter = (id) => ({
  type: t.SELECT_CHARACTER,
  payload: { id }
})

export const deselectCharacter = () => ({
  type: t.DESELECT_CHARACTER,
  payload: {}
})

export const enableCharacterEditMode = () => ({
  type: t.ENABLE_CHARACTER_EDIT_MODE,
  payload: {}
})

export const disableCharacterEditMode = () => ({
  type: t.DISABLE_CHARACTER_EDIT_MODE,
  payload: {}
})
