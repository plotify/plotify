import * as t from "./actionTypes";
import { getListFilter } from "./selectors";

import * as c from "../../../shared/characters/ipc-channels";
import { sendToModel } from "../../../shared/commons/ipc";

export function findCharacters() {
  return (dispatch, getState) => {
    const params = { deleted: false, filter: getListFilter(getState()) };
    return Promise.resolve()
      .then(() => dispatch(findCharactersRequest()))
      .then(() => sendToModel(c.FIND_CHARACTERS, params))
      .then(characters => dispatch(findCharactersSuccessful(characters)))
      .catch(error => dispatch(findCharactersFailed(error)));
  };
}

export function setCharactersFilter(filter) {
  return (dispatch) => {
    return Promise.resolve()
      .then(() => dispatch(setCharactersFilterRequest(filter)))
      .then(() => dispatch(findCharacters()));
  };
}

function findCharactersRequest() {
  return {
    type: t.FIND_CHARACTERS_REQUEST,
    payload: {}
  };
}

function findCharactersSuccessful(characters) {
  return {
    type: t.FIND_CHARACTERS_SUCCESSFUL,
    payload: { characters }
  };
}

function findCharactersFailed(error) {
  return {
    type: t.FIND_CHARACTERS_FAILED,
    payload: { error }
  };
}

function setCharactersFilterRequest(filter) {
  return {
    type: t.SET_CHARACTERS_FILTER,
    payload: { filter }
  };
}
