import { combineReducers } from "redux";
import page from "./page";
import story from "./story";
import characters from "./characters";

export default combineReducers({
  [page.constants.NAME]: page.reducer,
  [story.constants.NAME]: story.reducer,
  [characters.constants.NAME]: characters.reducer
});
