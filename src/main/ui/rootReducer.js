import { combineReducers } from "redux";
import story from "./story";

export default combineReducers({
  [story.constants.NAME]: story.reducer
});
