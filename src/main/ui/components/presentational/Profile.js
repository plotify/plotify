import React from "react";
import Paper from "material-ui/Paper";
import {palette, spacing} from "../../themes/PlotifyMainTheme";
import SavingTextField from "../containers/mixed/SavingTextField";
import ChangeType from "../../../shared/characters/change-type";

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

  handleProfileEntryChange(entryId, value, groupIndex, entryIndex, groupId) {
    console.log("CHANGING PROFILE:", entryId, value);
    this.props.onUpdateProfileEntry(
      {id: entryId, value, groupIndex, position: entryIndex, group_id: groupId});
  }

  render() {
    console.log("PROFILE", this.props.profile);
    return (
      <div id="CharacterDetails" style={styles}>
        {this.props.character.id &&
        <div>
          <div id="Attributes" style={styles.attributes}>
            {
              this.props.profile && this.props.profile.map((group, groupIndex) => {
                return <Paper style={styles.panel} zDepth={1} key={group.id}>
                  <h1>{group.title}</h1>
                  {group.entries.map((entry, entryIndex) => {
                    return <SavingTextField
                      key={entry.id}
                      initialValue={entry.value}
                      changeType={ChangeType.ENTRY}
                      onChange={(event) => this.handleProfileEntryChange(entry.id, event.target.value, groupIndex, entryIndex, group.id)}
                      typeId={entry.id}
                      hintText=""
                      floatingLabelText={entry.title}
                      value={entry.value}
                      fullWidth={true}
                      multiLine={true}
                    />;
                  })}

                </Paper>;

              })
            }

          </div>

          <Paper style={styles.toolbar} zDepth={2} rounded={false}>
            <SavingTextField
              focussed={true}
              changeType={ChangeType.CHARACTER}
              typeId={this.props.character.id}
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
              initialValue={this.props.character.name}
            />
          </Paper>
        </div>
        }
      </div>

    );
  }
}
