/* jslint browser: true */

import isDev from "electron-is-dev";

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./rootReducer";

let middleware;

if (isDev) {
  middleware = applyMiddleware(thunkMiddleware, logger);
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(rootReducer, middleware);

class App extends React.Component {
  render() {
    return (
      <h1>Hello world!</h1>
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

// Test: Öffne Geschichte:
//import { openStory } from "./story/actions";
//store.dispatch(openStory("/home/schmidt/Dokumente/Neue Geschichte 2.story"));


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
/*
import { sendToModel } from "../shared/commons/ipc";
import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
import { CREATE_CHARACTER, UPDATE_CHARACTER } from "../shared/characters/ipc-channels";
sendToModel(CREATE_STORY)
  .then(file => sendToModel(OPEN_STORY, file))
  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Max", deleted: false }))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Max Muster", deleted: false }))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Max Mustermann", deleted: false }));*/
/* Beispiel für das Öffnen einer Datei:
import { sendToModel } from "../shared/commons/ipc";
import { OPEN_STORY_DIALOG } from "../shared/stories/ipc-channels";
import { CREATE_CHARACTER, UPDATE_CHARACTER } from "../shared/characters/ipc-channels";
sendToModel(OPEN_STORY_DIALOG)
  .then(() => sendToModel(CREATE_CHARACTER))
  .then(characterId => sendToModel(UPDATE_CHARACTER,
    { id: characterId, name: "Erika", deleted: false }))
  .then(() => console.log("Opened and character created."))
  .catch(error => {

    if (error.name === "UnsupportedFileVersionError") {
      console.log("Unsupported file version!");
    } else if (error.name === "NoStoryChosenError") {
      console.log("No story chosen. Ignore this.");
    } else {
      console.log("Could not open story: " + error.name);
    }
  });*/

/*
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let middleware;

if (isDev) {
  middleware = applyMiddleware(thunkMiddleware, logger);
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(combinedReducer, middleware);

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(PlotifyMainTheme)}>
        <RealPlotifyApp/>
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
*/
