import { combineReducers } from "redux";
import list from "./list";
import profile from "./profile";

export default combineReducers({
  [list.constants.NAME]: list.reducer,
  [profile.constants.NAME]: profile.reducer
});
