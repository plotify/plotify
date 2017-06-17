import * as t from "./actionTypes";

import list from "../list";

import * as c from "../../../shared/characters/ipc-channels";
import { sendToModel } from "../../../shared/commons/ipc";

// TODO Sollte die Verbindung mit der Liste über eine Chain in die Liste ausgelagert werden?
export function createCharacter() {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => dispatch(createCharacterRequest()))
      .then(() => sendToModel(c.CREATE_CHARACTER))
      .then(id => dispatch(list.actions.selectCharacter(id)))
      .then(() => dispatch(list.actions.findCharacters()))
      .then(() => dispatch(createCharacterSuccessful()))
      .catch(error => dispatch(createCharacterFailed(error)));
  };
}

function createCharacterRequest() {
  return {
    type: t.CREATE_CHARACTER_REQUEST,
    payload: {}
  };
}

function createCharacterSuccessful() {
  return {
    type: t.CREATE_CHARACTER_SUCCESSFUL,
    payload: { }
  };
}

function createCharacterFailed(error) {
  return {
    type: t.CREATE_CHARACTER_FAILED,
    payload: { error }
  };
}
