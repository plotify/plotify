import {
  ADD_CHARACTER,
  CHANGE_SECTION, CLOSE_MSG,
  DESELECT_CHARACTER,
  RECEIVE_CHARACTERS,
  RECEIVE_STORY,
  REQUEST_STORY,
  SELECT_CHARACTER,
  SET_FILTER,
  SHOW_ERROR_MSG,
  SHOW_MSG,
  SHOW_SUCCESS_MSG
} from "./action-types";
import {combineReducers} from "redux";
import Pages from "../constants/sections";
import {ERROR, INFO, SUCCESS} from "../constants/MessageTypes";


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
    case ADD_CHARACTER:
      return {};
    case RECEIVE_CHARACTERS:
      return action.payload;
    default:
      return state;
  }
}

function selected(state = {id: null, newCharacter: false}, action) {
  switch (action.type) {
    case SELECT_CHARACTER:
      return {
        id: action.payload.id,
        newCharacter: false
      };

    case ADD_CHARACTER:
      return {
        id: action.payload.id,
        newCharacter: true
      };

    case DESELECT_CHARACTER:
      return {
        id: null,
        newCharacter: false
      };

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

export const combinedReducer = combineReducers({
  currentSection,
  characters,
  filter,
  story,
  sectionIsLoading,
  selected,
  message
});
