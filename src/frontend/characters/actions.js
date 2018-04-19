import * as t from './action-types'

import {
  CREATE_CHARACTER,
  FIND_CHARACTERS,
  GET_CHARACTERS,
  GET_PROFILE,
  UPDATE_CHARACTER,
  UPDATE_ENTRY
} from '../../shared/characters/requests'

import { CHARACTERS_SECTION } from './constants'
import { getSelectedCharacterId } from './selectors'
import { request } from '../shared/communication'
import { setSection } from '../navigation/actions'

export const openCharactersSection = () => async (dispatch) => {
  await dispatch(getCharacters())
  await dispatch(setSection(CHARACTERS_SECTION))
}

// TODO Optimistic creation
export const createCharacter = (name) => async (dispatch) => {
  dispatch(createCharacterRequest())
  try {
    const id = await request(CREATE_CHARACTER, name)
    dispatch(createCharacterSuccessful(id, name))
    dispatch(selectCharacter(id))
    dispatch(findCharacters())
  } catch (error) {
    dispatch(createCharacterFailed(error))
  }
}

const createCharacterRequest = () => ({
  type: t.CREATE_CHARACTER_REQUEST,
  payload: {}
})

export const createCharacterSuccessful = (id, name) => ({
  type: t.CREATE_CHARACTER_SUCCESSFUL,
  payload: { id, name }
})

const createCharacterFailed = (message) => ({
  type: t.CREATE_CHARACTER_FAILED,
  payload: { message }
})

export const getCharacters = () => async (dispatch) => {
  dispatch(getCharactersRequest())
  try {
    const characters = await request(GET_CHARACTERS)
    await dispatch(getCharactersSuccessful(characters))
    await dispatch(findCharacters())
  } catch (error) {
    await dispatch(getCharactersFailed(error))
  }
}

const getCharactersRequest = () => ({
  type: t.GET_CHARACTERS_REQUEST,
  payload: {}
})

export const getCharactersSuccessful = (characters) => ({
  type: t.GET_CHARACTERS_SUCCESSFUL,
  payload: { characters }
})

const getCharactersFailed = (message) => ({
  type: t.GET_CHARACTERS_FAILED,
  payload: { message }
})

export const findCharacters = () => async (dispatch) => {
  dispatch(findCharactersRequest)
  try {
    const characters = await request(FIND_CHARACTERS, { deleted: false })
    await dispatch(findCharactersSuccessful(characters))
  } catch (error) {
    await dispatch(findCharactersFailed(error))
  }
}

const findCharactersRequest = () => ({
  type: t.FIND_CHARACTERS_REQUEST,
  payload: {}
})

export const findCharactersSuccessful = (characters) => ({
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

export const selectCharacter = (id) => (dispatch, getState) => {
  if (getSelectedCharacterId(getState()) !== id) {
    dispatch(_selectCharacter(id))
    dispatch(loadProfile(id))
  }
}

export const _selectCharacter = (id) => ({
  type: t.SELECT_CHARACTER,
  payload: { id }
})

export const deselectCharacter = () => ({
  type: t.DESELECT_CHARACTER,
  payload: {}
})

const loadProfile = (id) => async (dispatch) => {
  try {
    dispatch(loadProfileRequest(id))
    const profile = await request(GET_PROFILE, id)
    dispatch(loadProfileSuccessful(id, profile))
  } catch (error) {
    dispatch(loadProfileFailed(error))
  }
}

export const loadProfileRequest = (id) => ({
  type: t.LOAD_PROFILE_REQUEST,
  payload: { id }
})

export const loadProfileSuccessful = (id, profile) => ({
  type: t.LOAD_PROFILE_SUCCESSFUL,
  payload: { id, profile }
})

const loadProfileFailed = (id, message) => ({
  type: t.LOAD_PROFILE_FAILED,
  payload: { id, message }
})

export const enableCharacterEditMode = () => ({
  type: t.ENABLE_CHARACTER_EDIT_MODE,
  payload: {}
})

export const disableCharacterEditMode = () => ({
  type: t.DISABLE_CHARACTER_EDIT_MODE,
  payload: {}
})

export const updateEntry = (id, value) => async (dispatch) => {
  dispatch(updateEntryRequest(id, value))
  try {
    await request(UPDATE_ENTRY, { id, value })
    dispatch(updateEntrySuccessful(id, value))
  } catch (error) {
    dispatch(updateEntryFailed(error))
  }
}

export const updateEntryRequest = (id, value) => ({
  type: t.UPDATE_PROFILE_ENTRY_REQUEST,
  payload: { id, value }
})

export const updateEntrySuccessful = (id, value) => ({
  type: t.UPDATE_PROFILE_ENTRY_SUCCESSFUL,
  payload: { id, value }
})

const updateEntryFailed = (message) => ({
  type: t.UPDATE_PROFILE_ENTRY_FAILED,
  payload: { message }
})

export const updateCharacterName = (id, name) => async (dispatch) => {
  try {
    dispatch(updateCharacterNameRequest(id))
    await request(UPDATE_CHARACTER, { id, name })
    dispatch(updateCharacterNameSuccessful(id, name))
    dispatch(findCharacters())
  } catch (error) {
    dispatch(updateCharacterNameFailed(id, error))
  }
}

export const updateCharacterNameRequest = (id) => ({
  type: t.UPDATE_CHARACTER_NAME_REQUEST,
  payload: { id }
})

export const updateCharacterNameSuccessful = (id, name) => ({
  type: t.UPDATE_CHARACTER_NAME_SUCCESSFUL,
  payload: { id, name }
})

const updateCharacterNameFailed = (id, message) => ({
  type: t.UPDATE_CHARACTER_NAME_FAILED,
  payload: { id, message }
})
