import * as t from "./actionTypes";
import * as s from "./selectors";

import list from "../list";

import * as c from "../../../shared/characters/ipc-channels";
import types from "../../../shared/characters/change-type";
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

export function setCharacterName(changedName) {
  return {
    type: t.SET_CHARACTER_NAME,
    payload: { changedName }
  };
}

export function saveCharacterName() {
  return (dispatch, getState) => {
    if (s.hasCharacterNameChanged(getState())) {

      const characterId = s.getCharacterId(getState());
      const changedName = s.getCharacterName(getState());
      const params = {
        characterId: characterId,
        type: types.CHARACTER,
        typeId: characterId,
        changes: { name: changedName }
      };

      return Promise.resolve()
        .then(() => dispatch(saveCharacterNameRequest()))
        .then(() => sendToModel(c.UPDATE_CHARACTER, params))
        .then(() => dispatch(list.actions.updateCharacterName(characterId, changedName)))
        .then(() => dispatch(saveCharacterNameSuccessful()))
        .catch(error => dispatch(saveCharacterNameFailed(error)));
    }

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
  return {
    type: t.LOAD_PROFILE_FAILED,
    payload: { error }
  };
}

function saveCharacterNameRequest() {
  return {
    type: t.SAVE_CHARACTER_NAME_REQUEST,
    payload: {}
  };
}

function saveCharacterNameSuccessful() {
  return {
    type: t.SAVE_CHARACTER_NAME_SUCCESSFUL,
    payload: {}
  };
}

function saveCharacterNameFailed(error) {
  return {
    type: t.SAVE_CHARACTER_NAME_FAILED,
    payload: { error }
  };
}
