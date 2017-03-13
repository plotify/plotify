export const ADD_CHARACTER = "ADD_CHARACTER";
export const ADD_RANDOM_CHARACTER = "ADD_RANDOM_CHARACTER";
export const SET_FILTER = "SET_FILTER";

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
