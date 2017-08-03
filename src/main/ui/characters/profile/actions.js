import * as t from "./actionTypes";
import * as s from "./selectors";

import list from "../list";

import * as c from "../../../shared/characters/ipc-channels";
import types from "../../../shared/characters/change-type";
import { sendToModel } from "../../../shared/commons/ipc";

export function loadProfile() {
  return (dispatch, getState) => {

    const character = list.selectors.getSelectedCharacter(getState());

    let id;
    let name;
    let deleted;

    // TODO Woraround: Wenn ein neuer Charakter erstellt wurde, befindet sich dieser nicht in der
    // Liste. Aus diesem Grund kann der Charakter nicht über getSelectedCharacter geladen werden.
    // Ein neuer Charakter hat keinen Namen und ist nicht gelöscht.
    if (character) {
      id = character.id;
      name = character.name;
      deleted = character.deleted;
    } else {
      id = list.selectors.getSelectedCharacterId(getState());
      name = "";
      deleted = false;
    }

    return Promise.resolve()
      .then(() => dispatch(loadProfileRequest(id, name, deleted)))
      .then(() => sendToModel(c.GET_CHARACTER_PROFILE, id))
      .then(groups => dispatch(loadProfileSuccessful(groups)))
      .then(() => dispatch(checkCanUndo()))
      .then(() => dispatch(checkCanRedo()))
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
        .then(() => dispatch(checkCanUndo()))
        .then(() => dispatch(checkCanRedo()))
        .catch(error => dispatch(saveCharacterNameFailed(error)));

    }
  };
}

export function setEntryValue(entryId, changedValue) {
  return {
    type: t.SET_ENTRY_VALUE,
    payload: { entryId, changedValue }
  };
}

export function saveEntryValue(entryId) {
  return (dispatch, getState) => {
    const hasEntryValueChanged = s.makeHasEntryValueChanged();
    const props = { entryId };
    if (hasEntryValueChanged(getState(), props)) {
      const getEntryValue = s.makeGetEntryValue();

      const characterId = s.getCharacterId(getState());
      const changedValue = getEntryValue(getState(), props);
      const params = {
        characterId: characterId,
        type: types.ENTRY,
        typeId: entryId,
        changes: { value: changedValue }
      };

      return Promise.resolve()
        .then(() => dispatch(saveEntryValueRequest(entryId)))
        .then(() => sendToModel(c.UPDATE_CHARACTER, params))
        .then(() => dispatch(saveEntryValueSuccessful(entryId)))
        .then(() => dispatch(checkCanUndo()))
        .then(() => dispatch(checkCanRedo()))
        .catch(error => dispatch(saveEntryValueFailed(entryId, error)));

    }
  };
}

export function checkCanRedo() {
  return (dispatch, getState) => {
    const characterId = list.selectors.getSelectedCharacter(getState()).id;

    return Promise.resolve()
      .then(() => sendToModel(c.CAN_REDO_CHARACTER_CHANGE, characterId))
      .then((data) => dispatch(checkCanRedoSuccessful(characterId, data)))
      .catch((err) => dispatch(checkCanRedoSuccessful(characterId, false)));
  }
}

export function checkCanUndo() {
  return (dispatch, getState) => {
    const characterId = list.selectors.getSelectedCharacter(getState()).id;

    return Promise.resolve()
      .then(() => sendToModel(c.CAN_UNDO_CHARACTER_CHANGE, characterId))
      .then((data) => dispatch(checkCanUndoSuccessful(characterId, data)))
      .catch((err) => dispatch(checkCanUndoSuccessful(characterId, false)));
  }
}

function checkCanRedoSuccessful(characterId, canUndo) {
  return {
    type: t.CAN_REDO_CHARACTER,
    payload: { characterId, canUndo }
  }
}

function checkCanUndoSuccessful(characterId, canUndo) {
  return {
    type: t.CAN_UNDO_CHARACTER,
    payload: { characterId, canUndo }
  }
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

function saveEntryValueRequest(entryId) {
  return {
    type: t.SAVE_ENTRY_VALUE_REQUEST,
    payload: { entryId }
  };
}

function saveEntryValueSuccessful(entryId) {
  return {
    type: t.SAVE_ENTRY_VALUE_SUCCESSFUL,
    payload: { entryId }
  };
}

function saveEntryValueFailed(entryId, error) {
  return {
    type: t.SAVE_ENTRY_VALUE_FAILED,
    payload: { entryId, error }
  };
}
