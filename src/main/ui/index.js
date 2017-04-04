/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PlotifyApp from "./components/PlotifyApp";

import injectTapEventPlugin from "react-tap-event-plugin";

import { createStore } from "redux";
import { Provider } from "react-redux";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore((state = {}, action) => { return state; });

class App extends React.Component {
  render() {
    return(
      <MuiThemeProvider>
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
