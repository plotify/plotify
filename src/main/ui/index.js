/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";
import logger from "redux-logger";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import PlotifyApp from "./components/app/PresentationalPlotifyApp";

import {pagesReducer} from "./service/reducers";

import PlotifyMainTheme from "./themes/PlotifyMainTheme";

import injectTapEventPlugin from "react-tap-event-plugin";
/* Beispiel:
import { sendToModel } from "../shared/commons/ipc";
import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
import {
  CREATE_CHARACTER,
  UPDATE_CHARACTER,
  FIND_CHARACTERS
} from "../shared/characters/ipc-channels";
sendToModel(CREATE_STORY)
  .then(file => sendToModel(OPEN_STORY, file))

  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Max Mustermann", deleted: false }))
  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Erika Musterfrau", deleted: false }))

  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Mr Deleted", deleted: true }))

  .then(() => sendToModel(FIND_CHARACTERS, { deleted: false }))
  .then(characters => console.log(characters))
  .then(() => sendToModel(FIND_CHARACTERS, { deleted: true }))
  .then(characters => console.log(characters));
*/

import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = createStore(pagesReducer, applyMiddleware(logger));

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(PlotifyMainTheme)}>
        <PlotifyApp/>
      </MuiThemeProvider>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};
