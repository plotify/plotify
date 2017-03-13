/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import charactersApp from "./characters/reducers";

import { Provider } from "react-redux";
import VisibleCharactersList from "./characters/visible-characters-list";

const store = createStore(charactersApp);

class App extends React.Component {
  render() {
    return(<VisibleCharactersList />);
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
