import * as t from "./actionTypes";
import { isStoryOpen } from "./selectors";

import snackbar from "../snackbar";

import * as c from "../../shared/stories/ipc-channels";
import { sendToModel } from "../../shared/commons/ipc";

import path from "path";
import { updateTitle } from "redux-title";

const productName = require("../../package.json").productName;
const fileExtension = ".story";
const storyCreatedMessage = "Deine Geschichte wurde erfolgreich erstellt.";

export function openStoryDialog() {
  return dispatch => {
    return Promise.resolve()
      .then(() => sendToModel(c.OPEN_STORY_DIALOG))
      .then(file => dispatch(openStoryIfFileSelected(file)))
      .catch(error => console.log("Fehler beim Öffnen des Dialogs:", error));
  };
}

export function openStory(file) {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeIfStoryIsOpen()))
      .then(() => dispatch(openStoryIfNoStoryIsOpen(file)));
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

export function createStory() {
  return dispatch => {
    return Promise.resolve()
      .then(() => dispatch(closeIfStoryIsOpen()))
      .then(() => dispatch(createStoryIfNoStoryIsOpen()));
  };
}

function openStoryIfFileSelected(file) {
  return dispatch => {
    if (file) {
      return dispatch(openStory(file));
    }
  };
}

function closeIfStoryIsOpen() {
  return (dispatch, getState) => {
    if (isStoryOpen(getState())) {
      return dispatch(closeStory());
    }
  };
}

function openStoryIfNoStoryIsOpen(file) {
  return (dispatch, getState) => {
    if (!isStoryOpen(getState())) {
      return Promise.resolve()
        .then(() => dispatch(openStoryRequest(file)))
        .then(() => sendToModel(c.OPEN_STORY, file))
        .then(() => dispatch(updateTitle(path.basename(file, fileExtension) + " - " + productName)))
        .then(() => dispatch(openStorySuccessful()))
        .catch(error => dispatch(openStoryFailed(error)));
    }
  };
}

function createStoryIfNoStoryIsOpen() {
  return (dispatch, getState) => {
    if (!isStoryOpen(getState())) {
      let createdFile;
      return Promise.resolve()
        .then(() => dispatch(createStoryRequest()))
        .then(() => sendToModel(c.CREATE_STORY))
        .then(file => createdFile = file)
        .then(() => dispatch(createStorySuccessful()))
        .then(() => dispatch(openStory(createdFile)))
        .then(() => dispatch(snackbar.actions.showSnackbar(storyCreatedMessage)))
        .catch(error => dispatch(createStoryFailed(error)));
    }
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

function closeStoryFailed(error) {
  return {
    type: t.CLOSE_STORY_FAILED,
    payload: { error }
  };
}

function createStoryRequest() {
  return {
    type: t.CREATE_STORY_REQUEST,
    payload: {}
  };
}

function createStorySuccessful() {
  return {
    type: t.CREATE_STORY_SUCCESSFUL,
    payload: {}
  };
}

function createStoryFailed(error) {
  return {
    type: t.CREATE_STORY_FAILED,
    payload: { error }
  };
}
