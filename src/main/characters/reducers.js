import { combineReducers } from "redux";
import UUID from "../common/uuid";

import {
  ADD_CHARACTER,
  ADD_RANDOM_CHARACTER,
  SET_FILTER,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER
} from "./actions";

function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const firstNames = ["Max", "Erika", "Rebecca", "Sebastian", "Jasper", "Gesa", "Laura", "Jonas",
                    "Tim", "Philipp", "Sarah", "Michael", "Lena", "Anna", "Elias"];
const lastNames = ["Mustermann", "Musterfrau", "Rademacher", "Schmidt", "Meyer", "Müller",
                   "Schneider", "Kruse", "Berg", "Thiel", "Schuhmann", "Zimmer", "Wenzel"];

function characters(state = [], action) {

  switch (action.type) {

    case ADD_CHARACTER:
      return state.concat({
        id: UUID.random(),
        name: action.payload.name
      });

    case ADD_RANDOM_CHARACTER:
      return state.concat({
        id: UUID.random(),
        name: getRandomElementFromArray(firstNames) + " " + getRandomElementFromArray(lastNames)
      });

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
