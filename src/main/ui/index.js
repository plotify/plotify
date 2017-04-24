/* jslint browser: true */

import isDev from "electron-is-dev";

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { syncReduxAndTitle } from "redux-title";
import chainedActionsMiddleware from "./chained-actions";
import logger from "redux-logger";

import App from "./page/components/App";
import { getMuiTheme, MuiThemeProvider } from "material-ui/styles/index";
import PlotifyMainTheme from "./themes/PlotifyMainTheme";

import rootReducer from "./rootReducer";

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
      <MuiThemeProvider muiTheme={getMuiTheme(PlotifyMainTheme)}>
        <App/>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};
