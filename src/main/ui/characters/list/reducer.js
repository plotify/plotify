import * as t from "./actionTypes";

const initialState = {
  loading: false,
  error: null,
  filter: "",
  characters: {},
  order: [],
  selected: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.FIND_CHARACTERS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case t.FIND_CHARACTERS_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: false,
        characters: action.payload.characters.reduce(charactersToMap, {}),
        order: action.payload.characters.map(character => character.id)
      });

    case t.FIND_CHARACTERS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        characters: {},
        order: []
      });

    case t.SET_CHARACTERS_FILTER:
      return Object.assign({}, state, {
        filter: action.payload.filter
      });

    default:
      return state;

  }
}

function charactersToMap(characters, character) {
  characters[character.id] = character;
  return characters;
}
