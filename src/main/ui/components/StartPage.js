import React from "react";
import ReactDOM from "react-dom";

/* Beispiel für das Erstellen und Öffnen einer neuen Geschichte:
import { sendToModel } from "../shared/commons/ipc";
import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
sendToModel(CREATE_STORY)
  .then(file => sendToModel(OPEN_STORY, file))
  .then(file => console.log("Story created and opened: " + file))
  .catch(error => console.log("Could not create or open story: " + error));
*/

const styles = {
  wrapper: {
    verticalAlign: "center",
  },
  newStory: {

  },
  openStory: {

  }
};

export default class StartPage extends React.Component {

  render() {
    return(
      <div style={styles.wrapper}>
        start
      </div>
    );
  }

}
