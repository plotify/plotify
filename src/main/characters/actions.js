export const ADD_CHARACTER = "ADD_CHARACTER";
export const ADD_RANDOM_CHARACTER = "ADD_RANDOM_CHARACTER";
export const SET_FILTER = "SET_FILTER";
export const SELECT_CHARACTER = "SELECT_CHARACTER";
export const UNSELECT_CHARACTER = "UNSELECT_CHARACTER";

export function addCharacter(name) {
  return {
    type: ADD_CHARACTER,
    payload: { name }
  };
}

export function addRandomCharacter() {
  return { type: ADD_RANDOM_CHARACTER };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: { filter }
  };
}

export function selectCharacter(id) {
  return {
    type: SELECT_CHARACTER,
    payload: { id }
  };
}

export function unselectCharacter() {
  return {
    type: UNSELECT_CHARACTER,
    payload: {}
  };
}
