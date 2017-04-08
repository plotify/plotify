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
/* Beispiel für das Erstellen und Öffnen einer neuen Geschichte:
 import { sendToModel } from "../shared/commons/ipc";
 import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
 sendToModel(CREATE_STORY)
 .then(file => sendToModel(OPEN_STORY, file))
 .then(file => console.log("Story created and opened: " + file))
 .catch(error => console.log("Could not create or open story: " + error));
 */
/* Beispiel für das Abrufen der nicht gelöschten Charaktere:
import { sendToModel } from "../shared/commons/ipc";
import { FIND_CHARACTERS } from "../shared/characters/ipc-channels";
sendToModel(FIND_CHARACTERS, { deleted: false })
  .then(characters => console.log(characters));*/
/* Beispiel für das Erstellen eines Charakters:
import { sendToModel } from "../shared/commons/ipc";
import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
import { CREATE_CHARACTER, UPDATE_CHARACTER } from "../shared/characters/ipc-channels";
sendToModel(CREATE_STORY)
  .then(file => sendToModel(OPEN_STORY, file))
  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Max Mustermann", deleted: false }))
  .then(() => console.log("Charakter erstellt!"));*/

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
