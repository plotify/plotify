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
  SHOW_SUCCESS_MSG, SET_SAVING_TYPE
} from "./action-types";
import {sendToModel} from "../../shared/commons/ipc";
import {CREATE_CHARACTER, FIND_CHARACTERS, UPDATE_CHARACTER, UNDO_CHARACTER_CHANGE} from "../../shared/characters/ipc-channels";
import {CLOSE_STORY, CREATE_STORY, OPEN_STORY, OPEN_STORY_DIALOG} from "../../shared/stories/ipc-channels";
import ChangeType from "../../shared/characters/change-type";
import Sections from "../constants/sections";
import path from "path";
import {shell} from "electron";
import SavingType from "../constants/SavingType";

// Communication State
export function sectionIsLoading(trueOrFalse) {
  return {
    type: "TOGGLE_SECTION_LOADING",
    payload: trueOrFalse
  };
}

export function setSavingType(savingType) {
  return {
    type: SET_SAVING_TYPE,
    payload: savingType,
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
export function selectCharacter(character) {
  return {
    type: SELECT_CHARACTER,
    payload: character
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

export function updateSelectedCharacter(character) {
  return {
    type: "UPDATE_CHARACTER",
    payload: character
  };
}

export function createCharacter() {
  return function (dispatch) {
    const defaultName = "";
    dispatch(requestCharacter());
    return sendToModel(CREATE_CHARACTER)
      .then((uuid) => sendToModel(UPDATE_CHARACTER,
        {
          characterId: uuid,
          type: ChangeType.CHARACTER,
          typeId: uuid,
          changes: {
            name: defaultName
          }
        }))
      // {id: uuid, name: "Neuer Charakter", deleted: false}))
      .then((uuid) => {
        const msg = "Charakter erfolgreich erstellt";
        console.log(msg, uuid);
        dispatch(showMessage(msg));
        dispatch(findCharacters());
        dispatch(selectCharacter({id: uuid, name: defaultName}));
        // dispatch(getCharacterById(uuid));
      })
      .catch((error) => console.log(error));
  };
}

export function updateCharacter(characterId, changeType, typeId, name) {
  return function (dispatch) {
    dispatch(requestCharacter());
    dispatch(setSavingType(SavingType.ACTIVE));
    return sendToModel(UPDATE_CHARACTER,
      {
        characterId: characterId,
        type: changeType,
        typeId: typeId,
        changes: {
          name: name
        }
      })
      .then(typeId => (console.log("Typ erfolgreich geändert", typeId)))
      .then(dispatch(showMessage("Charakter erfolgreich geändert")))
      .then(dispatch(setSavingType(SavingType.SUCCESS)));
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
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Erika"
              }
            }))
          /*.then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Max"
              }
            }))
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Maxmilian"
              }
            }))
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Maxmilian Mustermann"
              }
            }))
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Maxmilian von Mustermann"
              }
            }))
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Maxmilian von Müller"
              }
            }))
          .then(characterId => sendToModel(UNDO_CHARACTER_CHANGE, characterId))
          .then(content => sendToModel(UNDO_CHARACTER_CHANGE, content.id))
          .then(content => sendToModel(UNDO_CHARACTER_CHANGE, content.id))
          .then(content => sendToModel(UPDATE_CHARACTER,
            {
              characterId: content.id,
              type: ChangeType.CHARACTER,
              typeId: content.id,
              changes: {
                name: "Maxmilian Meier"
              }
            }))*/
          /*.then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Erika"
              }
            }))
          .then(uuid => sendToModel(UPDATE_CHARACTER,
            {
              characterId: uuid,
              type: ChangeType.CHARACTER,
              typeId: uuid,
              changes: {
                name: "Erika Musterfrau"
              }
            }))
          .then(characterId => sendToModel(UNDO_CHARACTER_CHANGE, characterId))
          .then(content => sendToModel(UPDATE_CHARACTER,
            {
              characterId: content.id,
              type: ChangeType.CHARACTER,
              typeId: content.id,
              changes: {
                name: "Erika Müller"
              }
            }))*/
          //.then(content => sendToModel(UNDO_CHARACTER_CHANGE, content.id))
          //.then(content => console.log(content))
          //.then(characterId => sendToModel(CAN_UNDO_CHARACTER_CHANGE, characterId))
          //.then(canUndo => console.log("can undo? " + canUndo))
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
