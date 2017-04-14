import {
  CHANGE_SECTION,
  CLOSE_MSG,
  DESELECT_CHARACTER,
  RECEIVE_CHARACTERS,
  RECEIVE_STORY,
  REQUEST_CHARACTER,
  REQUEST_CHARACTERS,
  REQUEST_STORY,
  SELECT_CHARACTER,
  SET_FILTER,
  SHOW_ERROR_MSG,
  SHOW_MSG,
  SHOW_SUCCESS_MSG
} from "./action-types";
import {sendToModel} from "../../shared/commons/ipc";
import {CREATE_CHARACTER, FIND_CHARACTERS, UPDATE_CHARACTER} from "../../shared/characters/ipc-channels";
import {CLOSE_STORY, CREATE_STORY, OPEN_STORY, OPEN_STORY_DIALOG} from "../../shared/stories/ipc-channels";
import Sections from "../constants/sections";
import path from "path";
import {shell} from "electron";

// Communication State
export function sectionIsLoading(trueOrFalse) {
  return {
    type: "TOGGLE_SECTION_LOADING",
    payload: trueOrFalse
  };
}

// UI ACTIONS

export function showMessage(message) {
  return {
    type: SHOW_MSG,
    payload: {message}
  };
}

export function showErrorMessage(message = "Fehler") {
  return {
    type: SHOW_ERROR_MSG,
    payload: {message}
  };
}

export function showSuccessMessage(message = "Success", withAction = false) {
  return {
    type: SHOW_SUCCESS_MSG,
    payload: {
      message: message,
      withAction: withAction
    }
  };
}

export function closeMessage() {
  return {
    type: CLOSE_MSG
  };
}

// SECTIONS
export function changeSection(section) {
  return {
    type: CHANGE_SECTION,
    payload: section
  };
}

// CHARACTER
export function selectCharacter(uuid) {
  return {
    type: SELECT_CHARACTER,
    payload: uuid
  };
}

export function deselectCharacter() {
  return {
    type: DESELECT_CHARACTER,
    payload: {}
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}

export function requestCharacter(uuid = "") {
  return {
    type: REQUEST_CHARACTER,
    payload: uuid
  };
}

export function createCharacter() {
  return function (dispatch) {
    dispatch(requestCharacter());
    return sendToModel(CREATE_CHARACTER)
      .then((uuid) => sendToModel(UPDATE_CHARACTER,
        {id: uuid, name: "Neuer Charakter", deleted: false}))
      .then((uuid) => {
        const msg = "Charakter erfolgreich erstellt";
        console.log(msg, uuid);
        dispatch(showMessage(msg));
        dispatch(findCharacters());
        dispatch(selectCharacter(uuid));
      })
      .catch((error) => console.log(error));
  };
}

export function requestCharacters() {
  return {
    type: REQUEST_CHARACTERS,
    payload: {}
  };
}

export function receiveCharacters(characters) {
  return {
    type: RECEIVE_CHARACTERS,
    payload: characters
  };
}

export function findCharacters(filter = "") {
  console.log("findCharacters()");
  return function (dispatch) {
    dispatch(requestCharacters());
    return sendToModel(FIND_CHARACTERS, {deleted: false, filter})
      .then(characters => {
        console.log("FOUND CHARACTERS", characters);
        dispatch(receiveCharacters(characters));
      }).catch(error => {
          console.log("Could not find characters: ", error);
        }
      );
  };
}

// STORIES
export function requestStory(file = "") {
  return {
    type: REQUEST_STORY,
    payload: file,
  };
}

export function receiveStory(file) {
  return {
    type: RECEIVE_STORY,
    payload: file,
  };
}

export function createStory() {
  return function (dispatch) {
    dispatch(sectionIsLoading(true));
    dispatch(requestStory());
    return sendToModel(CREATE_STORY)
      .then(file => {
        console.log("Story created", file);
        const scsMessage = "Deine Geschichte wurde erfolgreich erstellt. ";
        dispatch(showSuccessMessage(scsMessage, true));
        dispatch(openStory(file))
          .then(() => sendToModel(CREATE_CHARACTER))
          .then(characterId => sendToModel(UPDATE_CHARACTER,
            {id: characterId, name: "Erika", deleted: false}))
          .then(() => console.log("Opened and character created."))
          .then(() => dispatch(findCharacters()))
          .then(() => dispatch(changeSection(Sections.CHARACTER)))
          .then(dispatch(sectionIsLoading(false)));
      });
  };
}

export function openStory(file) {
  return function (dispatch) {
    dispatch(requestStory(file));
    dispatch(deselectCharacter());
    return sendToModel(CLOSE_STORY)
      .then(() => sendToModel(OPEN_STORY, file))
      .then((file) => {

        console.log("Story opened: ", file);
        dispatch(receiveStory(file));

        /* jslint browser: true */
        document.title = path.basename(file, ".story") + " - Plotify";

      })
      .catch(error => {
        dispatch(sectionIsLoading(false));
        const message = "Could not create or open story: " + error;
        console.log(message);
        dispatch(showErrorMessage(message));
      });
  };
}

export function openStoryDialog() {
  return function (dispatch) {
    dispatch(sectionIsLoading(true));
    return sendToModel(OPEN_STORY_DIALOG)
      .then((file) => {
        dispatch(openStory(file))
          .then(() => dispatch(findCharacters()))
          .then(() => dispatch(changeSection(Sections.CHARACTER)))
          .then(dispatch(sectionIsLoading(false)));
      })
      .catch(error => {
        dispatch(sectionIsLoading(false));
        let message;
        if (error.name === "UnsupportedFileVersionError") {
          message = "Unsupported file version!";
        } else if (error.name === "NoStoryChosenError") {
          message = "No story chosen. Ignore this.";
        } else {
          message = "Could not open story: " + error.name;
        }
        console.log(message);
        dispatch(showMessage(message));
      });
  };
}

export function openStoryFileLocation() {
  return (dispatch, getState) => {
    shell.showItemInFolder(getState().story);
  };
}
