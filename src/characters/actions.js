import * as t from './actionTypes'

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
