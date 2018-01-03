import * as t from './actionTypes'

import { CLOSE_STORY_PREPARATION_STARTED, OPEN_STORY_SUCCESSFUL } from '../story/action-types'

const initialState = {
  entities: [],
  selected: null,
  editMode: false,
  createDialogOpen: false,
  profile: []
}

// TODO FIND_CHARACTERS_REQUEST, FIND_CHARACTERS_FAILED
// TODO CREATE_CHARACTER_REQUEST, CREATE_CHARACTER_FAILED
// TODO LOAD_PROFILE_REQUEST, LOAD_PROFILE_FAILED
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FIND_CHARACTERS_SUCCESSFUL:
      return Object.assign({}, state, {
        entities: sortCharacters(action.payload.characters)
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
      const entities = [
        ...state.entities,
        {
          id: action.payload.id,
          name: action.payload.name
        }
      ]
      return Object.assign({}, state, {
        entities: sortCharacters(entities)
      })

    case t.SELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: action.payload.id
      })

    case t.DESELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: null,
        editMode: false,
        profile: []
      })

    // TODO Vergleiche action.payload.id mit selected
    case t.LOAD_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        profile: action.payload.profile
      })

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

const sortCharacters = (characters) => (
  characters.slice().sort(compareCharacters)
)

const compareCharacters = (character1, character2) => {
  const name1 = character1.name.toUpperCase()
  const name2 = character2.name.toUpperCase()

  if (name1 < name2) {
    return -1
  }

  if (name1 > name2) {
    return 1
  }

  return 0
}

export default reducer
