import {
  SELECT_CHARACTER,
  CHANGE_PAGE
} from "./action-types";

// UI ACTIONS

// PAGE
export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    payload: page
  };
}

// CHARACTER
export function selectCharacter(uuid) {
  return {
    type: SELECT_CHARACTER,
    payload: uuid
  };
}

// MODEL ACTIONS
export function addCharacter() {

}


