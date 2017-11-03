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
  entities: characters,
  selected: null
}

function reducer (state = initialState, action) {
  switch (action.type) {
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

export default reducer
