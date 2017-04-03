/* jslint browser: true */

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { sendMessageToMain } from "../shared/commons/ipc";
import { CREATE_STORY } from "../shared/stories/ipc-channels";

sendMessageToMain(CREATE_STORY, (event, payload) => {
  console.log("New story: " + payload);
});

const store = createStore((state = {}, action) => { return state; });

class App extends React.Component {
  render() {
    return(
      <div id="app">
        <h1>Hello world</h1>
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
