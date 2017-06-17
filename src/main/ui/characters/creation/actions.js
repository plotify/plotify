import * as t from "./actionTypes";

import * as c from "../../../shared/characters/ipc-channels";
import { sendToModel } from "../../../shared/commons/ipc";

export function createCharacter() {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => dispatch(createCharacterRequest()))
      .then(() => sendToModel(c.CREATE_CHARACTER))
      .then(id => createCharacterSuccessful(id))
      .catch(error => dispatch(createCharacterFailed(error)));
  };
}

function createCharacterRequest() {
  return {
    type: t.CREATE_CHARACTER_REQUEST,
    payload: {}
  };
}

function createCharacterSuccessful(id) {
  return {
    type: t.CREATE_CHARACTER_SUCCESSFUL,
    payload: { id }
  };
}

function createCharacterFailed(error) {
  return {
    type: t.CREATE_CHARACTER_FAILED,
    payload: { error }
  };
}
