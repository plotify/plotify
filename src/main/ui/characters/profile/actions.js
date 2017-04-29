import * as t from "./actionTypes";

import list from "../list";

import * as c from "../../../shared/characters/ipc-channels";
import { sendToModel } from "../../../shared/commons/ipc";

export function loadProfile() {
  return (dispatch, getState) => {
    const character = list.selectors.getSelectedCharacter(getState());
    return Promise.resolve()
      .then(() => dispatch(loadProfileRequest(character.id, character.name, character.deleted)))
      .then(() => sendToModel(c.GET_CHARACTER_PROFILE, character.id))
      .then(groups => dispatch(loadProfileSuccessful(groups)))
      .catch(error => dispatch(loadProfileFailed(error)));
  };
}

function loadProfileRequest(characterId, name, deleted) {
  return {
    type: t.LOAD_PROFILE_REQUEST,
    payload: { characterId, name, deleted }
  };
}

function loadProfileSuccessful(groups) {
  return {
    type: t.LOAD_PROFILE_SUCCESSFUL,
    payload: { groups }
  };
}

function loadProfileFailed(error) {
  console.log(error);
  return {
    type: t.LOAD_PROFILE_FAILED,
    payload: { error }
  };
}
