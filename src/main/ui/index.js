/* jslint browser: true */

import isDev from "electron-is-dev";

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { syncReduxAndTitle } from "redux-title";
import chainedActionsMiddleware from "./chained-actions";
import logger from "redux-logger";

import App from "./page/components/App";

import rootReducer from "./rootReducer";
injectTapEventPlugin();

let middleware;

if (isDev) {
  middleware = applyMiddleware(thunkMiddleware, chainedActionsMiddleware, logger);
} else {
  middleware = applyMiddleware(thunkMiddleware, chainedActionsMiddleware);
}

const store = createStore(rootReducer, middleware);
syncReduxAndTitle(store);

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"),
  );
};
