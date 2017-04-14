import React from "react";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import {palette, spacing} from "../../themes/PlotifyMainTheme";
import SavingTextField from "../containers/mixed/SavingTextField";

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

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
  }

  handleCharacterNameChange(event) {
    const value = event.target.value;
    this.props.onUpdateSelectedCharacter({id: this.props.character.id, name: value});
  }

  render() {
    return (
      <div id="CharacterDetails" style={styles}>
        <div id="Attributes" style={styles.attributes}>

          <Paper style={styles.panel} zDepth={1}>
            <TextField
              floatingLabelText="Alter"
              defaultValue="37"
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Größe"
              defaultValue="1,80 m"
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Gewicht"
              defaultValue="95 kg"
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Körperbau"
              defaultValue="Füllig"
              fullWidth={true}
            />
            <TextField
              floatingLabelText="Gesicht"
              defaultValue="Ernster Blick, kantige Gesichtszüge"
              fullWidth={true}
            />
          </Paper>

          <Paper style={styles.panel} zDepth={1}>
            <TextField
              hintText=""
              floatingLabelText="Hello World"
              fullWidth={true}
            />
            <TextField
              hintText=""
              floatingLabelText="Lorem Ipsum"
              fullWidth={true}
            />
          </Paper>
        </div>

        <Paper style={styles.toolbar} zDepth={2} rounded={false}>
          <SavingTextField
            floatingLabelText="Name"
            value={this.props.character.name}
            onChange={this.handleCharacterNameChange}
            style={styles.toolbar.textField}
            floatingLabelStyle={styles.toolbar.textField.colors}
            floatingLabelFocusStyle={styles.toolbar.textField.colors}
            underlineFocusStyle={styles.toolbar.textField.colors}
            underlineStyle={styles.toolbar.textField.colors}
            hintStyle={styles.toolbar.textField.colors}
            inputStyle={styles.toolbar.textField.colors}
          />
        </Paper>

      </div>
    );
  }
}
