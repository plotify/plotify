import Character from "./character";

export const ADD_CHARACTER = "ADD_CHARACTER";
export const SET_FILTER = "SET_FILTER";
export const SELECT_CHARACTER = "SELECT_CHARACTER";
export const UNSELECT_CHARACTER = "UNSELECT_CHARACTER";

export function addCharacter(name) {

  const character = new Character();
  character.name = name;

  return {
    type: ADD_CHARACTER,
    payload: character
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
