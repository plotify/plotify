import { ADD_CHARACTER, ADD_RANDOM_CHARACTER, SET_FILTER } from "./actions";
import { combineReducers } from "redux";

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
        name: action.payload.name
      });

    case ADD_RANDOM_CHARACTER:
      return state.concat({
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

const charactersApp = combineReducers({
  characters,
  filter
});

export default charactersApp;
