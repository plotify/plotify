import { combineReducers } from "redux";
import Character from "./character";

import {
  ADD_CHARACTER,
  SET_FILTER,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER
} from "./actions";

function characters(state = [], action) {
  switch (action.type) {

    case ADD_CHARACTER:
      return state.concat(action.payload);

    default:
      return state;

  }
}

function filter(state = "", action) {
  switch (action.type) {

    case SET_FILTER:
      return action.payload.filter;

    default:
      return state;

  }
}

function selected(state = null, action) {
  switch (action.type) {

    case SELECT_CHARACTER:
      return action.payload.id;

    case UNSELECT_CHARACTER:
      return null;

    default:
      return state;

  }
}

const charactersApp = combineReducers({
  characters,
  filter,
  selected
});

export default charactersApp;
