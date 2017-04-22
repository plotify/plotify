import { combineReducers } from "redux";
import story from "./story";
import chafacters from "./characters";

export default combineReducers({
  [story.constants.NAME]: story.reducer,
  [chafacters.constants.NAME]: chafacters.reducer
});
