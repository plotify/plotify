import Character from "./character";
import {
  ADD_CHARACTER,
  CHANGE_CHARACTER_NAME,
  SET_FILTER,
  SELECT_CHARACTER,
  UNSELECT_CHARACTER
} from "./action-types";

export function addCharacter(name) {
  const character = new Character();
  character.name = name;
  return {
    type: ADD_CHARACTER,
    payload: character
  };
}

export function changeCharacterName(id, name) {
  return {
    type: CHANGE_CHARACTER_NAME,
    payload: { id, name }
  };
}

export function addRandomCharacter() {
  const firstNames = ["Max", "Erika", "Rebecca", "Sebastian", "Jasper", "Gesa", "Laura", "Jonas",
                      "Tim", "Philipp", "Sarah", "Michael", "Lena", "Anna", "Elias"];
  const lastNames = ["Mustermann", "Musterfrau", "Rademacher", "Schmidt", "Meyer", "Müller",
                     "Schneider", "Kruse", "Berg", "Thiel", "Schuhmann", "Zimmer", "Wenzel"];
  const name = getRandomElementFromArray(firstNames) + " " + getRandomElementFromArray(lastNames);
  return addCharacter(name);
}

function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
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
