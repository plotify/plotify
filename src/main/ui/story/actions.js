import * as t from "./actionTypes";
import { isStoryOpen } from "./selectors";

import * as c from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";

// TODO ENTFERNEN: TEST:
//import * as a from "../characters/list/actions";

export function openStoryDialog() {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => validateOpenStory(getState()))
      .then(() => sendToModel(c.OPEN_STORY_DIALOG))
      .then(file => dispatch(openStory(file)));
  };
}

export function openStory(file) {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => validateOpenStory(getState()))
      .then(() => dispatch(openStoryRequest(file)))
      .then(() => sendToModel(c.OPEN_STORY, file))
      .then(() => dispatch(openStorySuccessful()))
      // TODO ENTFERNEN: TEST:
      //.then(() => dispatch(a.findCharacters()))
      //.then(() => dispatch(a.setCharactersFilter("Muster")))
      .catch(error => dispatch(openStoryFailed(error)));
  };
}

function validateOpenStory(state) {
  if (isStoryOpen(state)) {
    return Promise.reject("A story is already open.");
  } else {
    return Promise.resolve();
  }
}

export function closeStory() {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeStoryRequest()))
      .then(() => sendToModel(c.CLOSE_STORY))
      .then(() => dispatch(closeStorySuccessful()))
      .catch(error => dispatch(closeStoryFailed(error)));
  };
}

function openStoryRequest(file) {
  return {
    type: t.OPEN_STORY_REQUEST,
    payload: { file }
  };
}

function openStorySuccessful() {
  return {
    type: t.OPEN_STORY_SUCCESSFUL,
    payload: {}
  };
}

function openStoryFailed(error) {
  return {
    type: t.OPEN_STORY_FAILED,
    payload: { error }
  };
}

function closeStoryRequest() {
  return {
    type: t.CLOSE_STORY_REQUEST,
    payload: {}
  };
}

function closeStorySuccessful() {
  return {
    type: t.CLOSE_STORY_SUCCESSFUL,
    payload: {}
  };
}

function closeStoryFailed() {
  return {
    type: t.CLOSE_STORY_FAILED,
    payload: {}
  };
}
