import * as t from './actionTypes'

export function selectCharacter (id) {
  return {
    type: t.SELECT_CHARACTER,
    payload: { id }
  }
}

export function deselectCharacter () {
  return {
    type: t.DESELECT_CHARACTER,
    payload: {}
  }
}
