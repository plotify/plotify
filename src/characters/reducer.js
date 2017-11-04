import * as t from './actionTypes'
import uuid from 'uuid/v4'

const characters = [
  { id: uuid(), name: 'Sherlock Holmes' },
  { id: uuid(), name: 'Dr. Watson' },
  { id: uuid(), name: 'Mary Morstan' },
  { id: uuid(), name: 'Professor Moriarty' },
  { id: uuid(), name: 'Mycroft Holmes' },
  { id: uuid(), name: 'Irene Adler' },
  { id: uuid(), name: 'Inspector Lestrade' }
]

const initialState = {
  entities: sortCharacters(characters),
  selected: null,
  createDialogOpen: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
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
        selected: null
      })

    default:
      return state
  }
}

function sortCharacters (characters) {
  return characters.slice().sort(compareCharacters)
}

function compareCharacters (character1, character2) {
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
