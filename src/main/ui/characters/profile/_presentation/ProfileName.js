import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, CardMenu, CardSupportingText } from "../../../mdl-components/Card";
import { IconButton } from "../../../mdl-components/Buttons";
import SavingTextField from "./SavingTextField";

export default class ProfileName extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, value) {
    this.props.handleCharacterNameChanged(value);
  }

  render() {
    return (
      <Card className="plotify-character-profile--name-panel mdl-color--secondary">
        <CardMenu>
          <IconButton
            action={ this.handleUndo }
            icon="undo"
            tooltip="Rückgängig"
            id="undo-profile"
            disabled={ !this.props.canUndo }
          />
          <IconButton
            action={ this.handleRedo }
            icon="redo"
            tooltip="Wiederherstellen"
            id="redo-profile"
            disabled={ !this.props.canRedo }
          />
          <IconButton
            id="character-delete"
            icon="delete"
            tooltip="Charakter löschen"
            action={ this.props.onDeleteCharacter }
            disabled
          />
        </CardMenu>
        <CardSupportingText>
          <SavingTextField
            title="Name"
            id={ this.props.id }
            value={ this.props.name }
            saveEntry={ this.props.saveCharacterName }
            onChange={ this.handleChange }
            onSave={ this.props.saveCharacterName }
            isSaving={ this.props.isSaving }
            isSavingFailed={ this.props.isSavingFailed}
            hasValueChanged={ this.props.hasValueChanged}
            savingError={ this.props.savingError }
          />
        </CardSupportingText>
      </Card>
    );
  }
}

ProfileName.propTypes = {
  id:                         PropTypes.string.isRequired,
  name:                       PropTypes.string.isRequired,
  isSaving:                   PropTypes.bool.isRequired,
  isSavingFailed:             PropTypes.bool.isRequired,
  hasValueChanged:            PropTypes.bool.isRequired,
  canUndo:                    PropTypes.bool.isRequired,
  canRedo:                    PropTypes.bool.isRequired,
  handleUndo:                 PropTypes.func.isRequired,
  handleRedo:                 PropTypes.func.isRequired,
  onDeleteCharacter:          PropTypes.func.isRequired,
  handleCharacterNameChanged: PropTypes.func.isRequired,
  saveCharacterName:          PropTypes.func.isRequired,
  savingError:                PropTypes.shape({
    message: PropTypes.string,
  }),
};

ProfileName.defaultProps = {
  canUndo:           false,
  canRedo:           false,
  handleUndo:        () => console.warn("unset Props: handleUndo()"),
  handleRedo:        () => console.warn("unset Props: handleRedo()"),
  onDeleteCharacter: () => console.warn("unset Props: onDeleteCharacter()"),
  name:              "",
};
