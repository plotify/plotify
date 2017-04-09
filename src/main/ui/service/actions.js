import {
  CHANGE_SECTION,
  DESELECT_CHARACTER,
  RECEIVE_CHARACTERS,
  RECEIVE_STORY,
  REQUEST_CHARACTERS,
  REQUEST_STORY,
  SELECT_CHARACTER
} from "./action-types";
import {sendToModel} from "../../shared/commons/ipc";
import {FIND_CHARACTERS} from "../../shared/characters/ipc-channels";
import {CREATE_STORY, OPEN_STORY} from "../../shared/stories/ipc-channels";
import Sections from "../constants/sections";

// UI ACTIONS

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

export function addCharacter() {

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
  }
}

export function findCharacters() {
  return function (dispatch) {
    dispatch(requestCharacters());
    return sendToModel(FIND_CHARACTERS, {deleted: false})
      .then(characters => {
        console.log("FOUND CHARACTERS", characters);
        dispatch(receiveCharacters(characters));
      }).catch(error => {
          console.log("Could not create or open story: ", error);
        }
      );
  };
}

// STORIES
export function requestStory(file = "") {
  return {
    type: REQUEST_STORY,
    payload: file,
  }
}

export function receiveStory(file) {
  return {
    type: RECEIVE_STORY,
    payload: file,
  }
}

export function createStory() {
  return function (dispatch) {
    dispatch(requestStory());
    return sendToModel(CREATE_STORY)
      .then(file => {
        console.log("Story created", file);
        dispatch(openStory(file));
      })
  }
}

export function openStory(file) {
  return function (dispatch) {
    dispatch(requestStory(file));
    return sendToModel(OPEN_STORY, file)
      .then(file => {
        console.log("Story opened: ", file);
        dispatch(receiveStory(file))
      })
      .then(file => {
        dispatch(changeSection(Sections.CHARACTER));
      })
      .catch(error => {
        console.log("Could not create or open story: ", error);
      });
  }
}