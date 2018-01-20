import * as t from './actionTypes'

import { CLOSE_STORY_PREPARATION_STARTED, OPEN_STORY_SUCCESSFUL } from '../story/action-types'

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
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.UPDATE_PROFILE_ENTRY_SUCCESSFUL:
      const { id } = action.payload
      return {
        ...state,
        profile: {
          ...state.profile,
          entries: {
            ...state.profile.entries,
            [id]: {
              ...state.profile.entries[id],
              value: action.payload.value
            }
          }
        }
      }

    case t.UPDATE_CHARACTER_NAME_SUCCESSFUL:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...state.entities[action.payload.id],
            name: action.payload.name
          }
        }
      }

    case t.GET_CHARACTERS_SUCCESSFUL:
      return Object.assign({}, state, {
        entities: action.payload.characters
      })

    case t.FIND_CHARACTERS_SUCCESSFUL:
      return Object.assign({}, state, {
        list: action.payload.characters
      })

    case t.OPEN_CREATE_CHARACTER_DIALOG:
      return Object.assign({}, state, {
        createDialogOpen: true
      })

    case t.CLOSE_CREATE_CHARACTER_DIALOG:
    case CLOSE_STORY_PREPARATION_STARTED:
      return Object.assign({}, state, {
        createDialogOpen: false
      })

    case t.CREATE_CHARACTER_SUCCESSFUL:
      const entities = {
        ...state.entities,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          deleted: false
        }
      }
      return Object.assign({}, state, { entities })

    case t.SELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: action.payload.id,
        editMode: false,
        profile: initialProfile
      })

    case t.DESELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: null,
        editMode: false,
        profile: initialProfile
      })

    case t.LOAD_PROFILE_REQUEST:
      return {
        ...state,
        profileFetching: true
      }

    // TODO Vergleiche action.payload.id mit selected
    case t.LOAD_PROFILE_SUCCESSFUL:
      return {
        ...state,
        profileFetching: false,
        profile: action.payload.profile
      }
    case t.ENABLE_CHARACTER_EDIT_MODE:
      if (state.selected !== null) {
        return Object.assign({}, state, {
          editMode: true
        })
      } else {
        return state
      }

    case t.DISABLE_CHARACTER_EDIT_MODE:
      return Object.assign({}, state, {
        editMode: false
      })

    case OPEN_STORY_SUCCESSFUL:
      return initialState

    default:
      return state
  }
}

export default reducer
