/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import charactersReducer from "./characters/reducers";

import { Provider } from "react-redux";
import VisibleCharactersList from "./characters/containers/visible-characters-list";
import SelectedCharacter from "./characters/containers/selected-character";

const store = createStore(charactersReducer);

class App extends React.Component {
  render() {
    return(
      <div id="app">
        <VisibleCharactersList />
        <SelectedCharacter />
      </div>
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
