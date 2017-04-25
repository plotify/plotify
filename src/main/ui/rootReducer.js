import { combineReducers } from "redux";

import { titleReducer } from "redux-title";
import snackbar from "./snackbar";
import page from "./page";
import story from "./story";
import characters from "./characters";

export default combineReducers({
  title: titleReducer,
  [snackbar.constants.NAME]: snackbar.reducer,
  [page.constants.NAME]: page.reducer,
  [story.constants.NAME]: story.reducer,
  [characters.constants.NAME]: characters.reducer
});
