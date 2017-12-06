import * as t from './actionTypes'

import { CHARACTERS_SECTION } from './constants'
import { FIND_CHARACTERS } from '../../shared/characters/requests'
import { request } from '../shared/communication'
import { setSection } from '../navigation/actions'

export const openCharactersSection = () => {
  return async (dispatch) => {
    dispatch(setSection(CHARACTERS_SECTION))
    dispatch(findCharacters())
  }
}

export const findCharacters = () => {
  return async (dispatch) => {
    dispatch(findCharactersRequest)
    try {
      const characters = await request(FIND_CHARACTERS, { deleted: false })
      dispatch(findCharactersSuccessful(characters))
    } catch (error) {
      dispatch(findCharactersFailed(error))
    }
  }
}

const findCharactersRequest = () => ({
  type: t.FIND_CHARACTERS_REQUEST,
  payload: {}
})

const findCharactersSuccessful = (characters) => ({
  type: t.FIND_CHARACTERS_SUCCESSFUL,
  payload: { characters }
})

const findCharactersFailed = (message) => ({
  type: t.FIND_CHARACTERS_FAILED,
  payload: { message }
})

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
