import * as t from './actionTypes'

import { OPEN_STORY_SUCCESSFUL } from '../story/action-types'
import defaultProfile from './default-profile'
import uuid from 'uuid/v4'

const initialState = {
  entities: [],
  selected: null,
  editMode: false,
  createDialogOpen: false,
  profile: defaultProfile
}

// TODO FIND_CHARACTERS_REQUEST, FIND_CHARACTERS_FAILED
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
      return Object.assign({}, state, {
        createDialogOpen: false
      })

    case t.CREATE_CHARACTER:
      const id = uuid()
      const entities = [
        ...state.entities,
        {
          id: id,
          name: action.payload.name
        }
      ]
      return Object.assign({}, state, {
        entities: sortCharacters(entities),
        selected: id
      })

    case t.SELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: action.payload.id
      })

    case t.DESELECT_CHARACTER:
      return Object.assign({}, state, {
        selected: null,
        editMode: false
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
