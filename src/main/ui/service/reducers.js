import {CHANGE_PAGE, SELECT_CHARACTER} from "./action-types";
import {combineReducers} from "redux";
import Pages from "../constants/pages";

function currentPage(state = Pages.START, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.payload;
    default:
      return state;
  }
}

function characters(action) {
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

export const charactersReducer = combineReducers({
  characters,
  filter,
  selected
});

export const pagesReducer = combineReducers({
  currentPage,
});