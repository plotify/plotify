import { combineReducers } from "redux";
import { titleReducer } from "redux-title";

import page from "./page";
import story from "./story";
import characters from "./characters";

export default combineReducers({
  title: titleReducer,
  [page.constants.NAME]: page.reducer,
  [story.constants.NAME]: story.reducer,
  [characters.constants.NAME]: characters.reducer
});
