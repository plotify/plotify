import { combineReducers } from "redux";
import list from "./list";
import creation from "./creation";
import profile from "./profile";

export default combineReducers({
  [list.constants.NAME]: list.reducer,
  [creation.constants.NAME]: creation.reducer,
  [profile.constants.NAME]: profile.reducer
});
