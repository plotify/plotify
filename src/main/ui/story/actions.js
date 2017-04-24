import * as t from "./actionTypes";
import { isStoryOpen } from "./selectors";

import * as c from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";

export function openStoryDialog() {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => sendToModel(c.OPEN_STORY_DIALOG))
      .then(file => {
        if (file) {
          return dispatch(openStory(file));
        } else {
          return Promise.resolve();
        }
      })
      .catch(error => console.log("Fehler beim Öffnen des Dialogs:", error));
  };
}

export function openStory(file) {
  return (dispatch, getState) => {
    return Promise.resolve()
      .then(() => dispatch(closeStory()))
      .then(() => {
        if (!isStoryOpen(getState())) {
          return Promise.resolve()
            .then(() => dispatch(openStoryRequest(file)))
            .then(() => sendToModel(c.OPEN_STORY, file))
            .then(() => dispatch(openStorySuccessful()))
            .catch(error => dispatch(openStoryFailed(error)));
        }
      });
  };
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
