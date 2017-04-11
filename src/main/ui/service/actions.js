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
import {CREATE_CHARACTER, FIND_CHARACTERS, UPDATE_CHARACTER} from "../../shared/characters/ipc-channels";
import {CREATE_STORY, CLOSE_STORY, OPEN_STORY, OPEN_STORY_DIALOG} from "../../shared/stories/ipc-channels";
import Sections from "../constants/sections";
import path from "path";

// Communication State
export function sectionIsLoading(trueOrFalse) {
  return {
    type: "TOGGLE_SECTION_LOADING",
    payload: trueOrFalse
  };
}

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

export function setFilter(filter) {
  return {
    type: "FILTER",
    payload: filter
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
  };
}

export function findCharacters() {
  console.log("findCharacters()");
  return function (dispatch) {
    dispatch(requestCharacters());
    return sendToModel(FIND_CHARACTERS, {deleted: false})
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
    let loadingPromise = new Promise((resolve, reject) => {
      resolve();
    });
    loadingPromise.then(() => {
      dispatch(sectionIsLoading(true));
      dispatch(requestStory());
      return sendToModel(CREATE_STORY)
        .then(file => {
          console.log("Story created", file);
          dispatch(openStory(file))
            .then(() => sendToModel(CREATE_CHARACTER))
            .then(characterId => sendToModel(UPDATE_CHARACTER,
              {id: characterId, name: "Erika", deleted: false}))
            .then(() => console.log("Opened and character created."))
            .then(() => dispatch(findCharacters()))
            .then(() => dispatch(changeSection(Sections.CHARACTER)))
            .then(dispatch(sectionIsLoading(false)));
        });
    });
  };
}

export function openStory(file) {
  return function (dispatch) {
    dispatch(requestStory(file));
    return sendToModel(CLOSE_STORY)
      .then(() => sendToModel(OPEN_STORY, file))
      .then((file) => {

        console.log("Story opened: ", file);
        dispatch(receiveStory(file));

        /* jslint browser: true */
        document.title = path.basename(file, ".story") + " - Plotify";

      })
      /*
       .then(() => {
       dispatch(changeSection(Sections.CHARACTER));
       })
       */
      .catch(error => {
        dispatch(sectionIsLoading(false));
        console.log("Could not create or open story: ", error);
      });
  };
}

export function openStoryDialog() {
  return function (dispatch) {
    let loadingPromise = new Promise((resolve, reject) => {
      dispatch(sectionIsLoading(true));
      resolve();
    });
    loadingPromise.then(() => {
      return sendToModel(OPEN_STORY_DIALOG)
        .then((file) => {
          console.log("Story Chosen", file);
          dispatch(receiveStory(file));
        })
        .then(() => {
            console.log("Lade Charaktere...");
            dispatch(findCharacters());
          }
        )
        .then(() => {
          dispatch(changeSection(Sections.CHARACTER));
          dispatch(sectionIsLoading(false));
        })
        .catch(error => {
          dispatch(sectionIsLoading(false));
          if (error.name === "UnsupportedFileVersionError") {
            console.log("Unsupported file version!");
          } else if (error.name === "NoStoryChosenError") {
            console.log("No story chosen. Ignore this.");
          } else {
            console.log("Could not open story: " + error.name);
          }
        });
    });
  };
}
