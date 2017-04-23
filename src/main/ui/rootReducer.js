import { combineReducers } from "redux";
import page from "./page";
import story from "./story";
import chafacters from "./characters";

export default combineReducers({
  [page.constants.NAME]: page.reducer,
  [story.constants.NAME]: story.reducer,
  [chafacters.constants.NAME]: chafacters.reducer
});
