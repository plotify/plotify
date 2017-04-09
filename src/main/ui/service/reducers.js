import {
  CHANGE_SECTION,
  REQUEST_STORY,
  RECEIVE_STORY,
  SELECT_CHARACTER,
} from "./action-types";
import {combineReducers} from "redux";
import Pages from "../constants/sections";


function sectionIsLoading(state = false, action) {
  switch (action.type) {
    case "TOGGLE_SECTION_LOADING":
      return action.payload;
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

function characters(state = [], action) {
  switch (action.type) {
    case SELECT_CHARACTER:
    default:
      return state;
  }
}

function filter() {

}

function selected() {

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
  story,
  sectionIsLoading,
});