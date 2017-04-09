import React from "react";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import {palette, spacing} from "../../themes/PlotifyMainTheme";

/* Beispiel für das Erstellen und Öffnen einer neuen Geschichte:
 import { sendToModel } from "../shared/commons/ipc";
 import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
 sendToModel(CREATE_STORY)
 .then(file => sendToModel(OPEN_STORY, file))
 .then(file => console.log("Story created and opened: " + file))
 .catch(error => console.log("Could not create or open story: " + error));
 */


const styles = {
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",
  toolbar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    backgroundColor: palette.primary2Color,
    width: "100%",
    textField: {
      margin: spacing.iconSize,
      width: "90%",
      colors: {
        color: palette.alternateTextColor,
        borderColor: palette.alternateTextColor
      }
    }
  },
  attributes: {
    top: 184,
    position: "fixed",
    width: "calc(100% - 396px)",
    height: "calc(100% - 184px)",
    overflowY: "auto",
    overflowX: "hidden",
    verticalAlign: "center",
  },
  panel: {
    position: "relative",
    width: "90%",
    maxWidth: "94%",
    margin: spacing.desktopGutter,
    padding: 15,
    display: "inline-block"
  }
};

export class Profile extends React.Component {
  render() {
    return (
      <div id="CharacterDetails" style={styles}>
        <div id="Attributes" style={styles.attributes}>
          <Paper style={styles.panel} zDepth={1}>
            <TextField
              hintText=""
              floatingLabelText="Körpergröße"
              fullWidth={true}
            />
            <TextField
              hintText=""
              floatingLabelText="Augenfarbe"
              fullWidth={true}
            />
          </Paper>

          <Paper style={styles.panel} zDepth={1}>
            <TextField
              hintText=""
              floatingLabelText="Körpergröße"
              fullWidth={true}
            />
            <TextField
              hintText=""
              floatingLabelText="Augenfarbe"
              fullWidth={true}
            />
          </Paper>
        </div>

        <Paper style={styles.toolbar} zDepth={2} rounded={false}>
          <TextField
            hintText="Gebe hier den Namen ein"
            floatingLabelText="Name"
            style={styles.toolbar.textField}
            floatingLabelStyle={styles.toolbar.textField.colors}
            floatingLabelFocusStyle={styles.toolbar.textField.colors}
            underlineFocusStyle={styles.toolbar.textField.colors}
            underlineStyle={styles.toolbar.textField.colors}
            hintStyle={styles.toolbar.textField.colors}
            inputStyle={styles.toolbar.textField.colors}
            defaultValue={this.props.characterId}
          />
        </Paper>

      </div>
    );
  }
}
