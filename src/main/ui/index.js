/* jslint browser: true */

import isDev from "electron-is-dev";

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import chainedActionsMiddleware, { registerChain } from "./chained-actions";
import logger from "redux-logger";

import rootReducer from "./rootReducer";

let middleware;

if (isDev) {
  middleware = applyMiddleware(thunkMiddleware, chainedActionsMiddleware, logger);
} else {
  middleware = applyMiddleware(thunkMiddleware, chainedActionsMiddleware);
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

// Test: Öffne Geschichte und lade Charaktere:
import story from "./story";
import charactersList from "./characters/list";
registerChain(story.actionTypes.OPEN_STORY_SUCCESSFUL,
              charactersList.actions.findCharacters);
store.dispatch(story.actions.openStoryDialog());
