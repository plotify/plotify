import {
  ADD_CHARACTER,
  CHANGE_SECTION,
  CLEAR_CHARACTERS,
  CLOSE_MSG,
  DESELECT_CHARACTER,
  RECEIVE_CAN_REDO,
  RECEIVE_CAN_UNDO,
  RECEIVE_CHARACTERS,
  RECEIVE_PROFILE,
  RECEIVE_REDO,
  RECEIVE_STORY,
  RECEIVE_UNDO,
  REQUEST_CAN_REDO,
  REQUEST_CAN_UNDO,
  REQUEST_CHARACTERS,
  REQUEST_PROFILE,
  REQUEST_REDO,
  REQUEST_STORY,
  REQUEST_UNDO,
  SELECT_CHARACTER,
  SET_FILTER,
  SET_SAVING_TYPE,
  SHOW_ERROR_MSG,
  SHOW_MSG,
  SHOW_SUCCESS_MSG,
  UPDATE_UI_PROFILE
} from "./action-types";
import {combineReducers} from "redux";
import Pages from "../constants/sections";
import {ERROR, INFO, SUCCESS} from "../constants/MessageTypes";

function communications(state = {savingType: false}, action) {
  switch (action.type) {
    case SET_SAVING_TYPE:
      return {savingType: action.payload};
    default:
      return state;
  }
}

function sectionIsLoading(state = false, action) {
  switch (action.type) {
    case "TOGGLE_SECTION_LOADING":
      return action.payload;
    default:
      return state;
  }
}

function message(state = {message: "NaN", open: false, type: INFO}, action) {
  switch (action.type) {
    case SHOW_MSG:
      return {
        message: action.payload.message,
        open: true
      };
    case SHOW_ERROR_MSG:
      return {
        message: action.payload.message,
        open: true,
        type: ERROR
      };
    case SHOW_SUCCESS_MSG:
      return {
        message: action.payload.message,
        open: true,
        type: SUCCESS,
        withAction: action.payload.withAction,
      };
    case CLOSE_MSG:
      return {
        open: false,
        message: state.message,
      };
    default:
      return state;
  }
}

function currentSection(state = Pages.WELCOME, action) {
  switch (action.type) {
    case CHANGE_SECTION:
      return action.payload;
    default:
      return state;
  }
}

function filter(state = "", action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload;
    }
    default:
      return state;
  }
}

function characters(state = [], action) {
  switch (action.type) {
    case "CHANGE_CHARACTER":
      return Object.assign({}, state, action.payload);
    case RECEIVE_CHARACTERS:
      return Object.assign([], state, action.payload);
    case REQUEST_CHARACTERS:
      return [];
    default:
      return state;
  }
}

function selectedCharacter(state = {id: null, newCharacter: false}, action) {
  switch (action.type) {
    case UPDATE_UI_PROFILE:
      let stateCopy = Object.assign({}, state);
      stateCopy.profile[action.payload.groupIndex]
        .entries[action.payload.entryIndex]
        .value = action.payload.value;
      return stateCopy;
    case REQUEST_PROFILE:
      return Object.assign({}, state);
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {profile: action.payload})

    case SELECT_CHARACTER:
      return Object.assign({}, state, action.payload, {newCharacter: false});
    case "UPDATE_CHARACTER":
      return Object.assign({}, state, action.payload, {newCharacter: false});
    case ADD_CHARACTER:
      return Object.assign({}, state, action.payload, {newCharacter: true});
    case DESELECT_CHARACTER:
      return Object.assign({}, {newCharacter: false});
    default:
      return state;

  }
}


function story(state = "", action) {
  switch (action.type) {
    case REQUEST_STORY:
    case RECEIVE_STORY:
      return action.payload;
    default:
      return state;
  }
}

function history(state = {
                   undo: {isAvailable: false, changes: {}},
                   redo: {isAvailable: false, changes: {}},
                 }, action) {
  switch (action.type) {

    case REQUEST_CAN_REDO:
      return state;
    case RECEIVE_CAN_REDO:
      return Object.assign({}, state, {redo: {isAvailable: action.payload}});
    case RECEIVE_REDO:
      return Object.assign({}, state, {redo: {changes: action.payload}});
    case REQUEST_REDO:
      return state;
    case REQUEST_CAN_UNDO:
      return state;
    case RECEIVE_CAN_UNDO:
      return Object.assign({}, state, {undo: {isAvailable: action.payload}});
    case RECEIVE_UNDO:
      return Object.assign({}, state, {undo: {changes: action.payload}});
    case REQUEST_UNDO:
      return state;
    default:
      return state;
  }
}

export const combinedReducer = combineReducers({
  currentSection,
  characters,
  filter,
  story,
  sectionIsLoading,
  communications,
  selectedCharacter,
  message,
  history,
});
