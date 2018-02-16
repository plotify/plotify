import {
  CLOSE_CREATE_CHARACTER_DIALOG,
  CREATE_CHARACTER_SUCCESSFUL,
  DESELECT_CHARACTER,
  DISABLE_CHARACTER_EDIT_MODE,
  ENABLE_CHARACTER_EDIT_MODE,
  FIND_CHARACTERS_SUCCESSFUL,
  GET_CHARACTERS_SUCCESSFUL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESSFUL,
  OPEN_CREATE_CHARACTER_DIALOG,
  SELECT_CHARACTER,
  UPDATE_CHARACTER_NAME_SUCCESSFUL,
  UPDATE_PROFILE_ENTRY_SUCCESSFUL
} from './actionTypes'
import {
  CLOSE_STORY_PREPARATION_STARTED,
  OPEN_STORY_SUCCESSFUL,
  STORY_CLOSED
} from '../story/action-types'

import { createReducer } from '../../shared/redux'

const initialProfile = {
  id: undefined,
  groupOrder: [],
  groups: {},
  entries: {}
}
const initialState = {
  entities: {},
  list: [],
  selected: null,
  editMode: false,
  createDialogOpen: false,
  profile: initialProfile,
  profileFetching: false
}

// TODO GET_CHARACTERS_REQUEST, GET_CHARACTERS_FAILED
// TODO FIND_CHARACTERS_REQUEST, FIND_CHARACTERS_FAILED
// TODO CREATE_CHARACTER_REQUEST, CREATE_CHARACTER_FAILED
// TODO LOAD_PROFILE_FAILED
// TODO UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAILED
// TODO UPDATE_CHARACTER_NAME_REQUEST, UPDATE_CHARACTER_NAME_FAILED

// TODO GET_CHARACTERS_REQUEST, GET_CHARACTERS_FAILED
// TODO FIND_CHARACTERS_REQUEST, FIND_CHARACTERS_FAILED
// TODO CREATE_CHARACTER_REQUEST, CREATE_CHARACTER_FAILED
// TODO LOAD_PROFILE_FAILED
// TODO UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAILED
// TODO UPDATE_CHARACTER_NAME_REQUEST, UPDATE_CHARACTER_NAME_FAILED
export default createReducer(initialState, {
  [UPDATE_PROFILE_ENTRY_SUCCESSFUL]: (state, { id, value }) => ({
    ...state,
    profile: {
      ...state.profile,
      entries: {
        ...state.profile.entries,
        [id]: {
          ...state.profile.entries[id],
          value
        }
      }
    }
  }),

  [UPDATE_CHARACTER_NAME_SUCCESSFUL]: (state, { id, name }) => ({
    ...state,
    entities: {
      ...state.entities,
      [id]: {
        ...state.entities[id],
        name
      }
    }
  }),

  [GET_CHARACTERS_SUCCESSFUL]: (state, { characters }) => ({
    ...state,
    entities: characters
  }),

  [FIND_CHARACTERS_SUCCESSFUL]: (state, { characters }) => ({
    ...state,
    list: characters
  }),

  [OPEN_CREATE_CHARACTER_DIALOG]: (state) => ({
    ...state,
    createDialogOpen: true
  }),
  [CLOSE_CREATE_CHARACTER_DIALOG]: (state) => ({
    ...state,
    createDialogOpen: false
  }),
  [CLOSE_STORY_PREPARATION_STARTED]: (state) => ({
    ...state,
    createDialogOpen: false
  }),

  [CREATE_CHARACTER_SUCCESSFUL]: (state, { id, name }) => ({
    ...state,
    entities: {
      ...state.entities,
      [id]: {
        id,
        name,
        deleted: false
      }
    }
  }),

  [SELECT_CHARACTER]: (state, { id }) => ({
    ...state,
    selected: id,
    editMode: false,
    profile: initialProfile
  }),
  [DESELECT_CHARACTER]: (state) => ({
    ...state,
    selected: null,
    editMode: false,
    profile: initialProfile
  }),

  [LOAD_PROFILE_REQUEST]: (state) => ({
    ...state,
    profileFetching: true
  }),
  // TODO Vergleiche action.payload.id mit selected
  [LOAD_PROFILE_SUCCESSFUL]: (state, { profile }) => ({
    ...state,
    profileFetching: false,
    profile
  }),

  [ENABLE_CHARACTER_EDIT_MODE]: (state) => ({
    ...state,
    editMode: state.selected !== null
  }),
  [DISABLE_CHARACTER_EDIT_MODE]: (state) => ({
    ...state,
    editMode: false
  }),

  [OPEN_STORY_SUCCESSFUL]: () => initialState,
  [STORY_CLOSED]: () => initialState
})
