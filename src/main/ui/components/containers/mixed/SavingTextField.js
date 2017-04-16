import React from "react";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {canRedoCharacterChange, canUndoCharacterChange, updateCharacter} from "../../../service/actions";
import {palette} from "../../../themes/PlotifyMainTheme";
import ChangeTypes from "../../../../shared/characters/change-type";

const mapStateToProps = (state) => {
  return {
    characterId: state.selectedCharacter.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCanUndo: (id) => {
      dispatch(canUndoCharacterChange(id));
    },
    onCanRedo: (id) => {
      dispatch(canRedoCharacterChange(id));
    },
    onSave: (characterId, changeType, typeId, changes) => {
      dispatch(updateCharacter(characterId, changeType, typeId, changes));
    }
  };
};

class SavingTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: ""
    };
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    if (this.props.focussed) {
      this.input.focus();
    }
  }

  focus() {
    const inV = this.props.initialValue;
    this.setState({initialValue: inV});
  }

  blur() {
    this.input.blur();
    if (this.state.initialValue !== this.props.value) {
      let changes;
      if (this.props.changeType === ChangeTypes.CHARACTER) {
        changes = {name: this.props.value};
      } else {
        changes = {
          value: this.props.value
        };
      }

      this.props.onSave(
        this.props.characterId,
        this.props.changeType,
        this.props.typeId,
        changes);
    }
  }

  render() {
    return (
      <TextField
        ref={(input) => {
          this.input = input
        }}
        floatingLabelText={this.props.floatingLabelText}
        value={this.props.value}
        onChange={this.props.onChange}
        style={this.props.style}
        floatingLabelStyle={this.props.floatingLabelStyle || {color: palette.primary2Color}}
        floatingLabelFocusStyle={this.props.floatingLabelFocusStyle}
        underlineFocusStyle={this.props.underlineFocusStyle}
        underlineStyle={this.props.underlineStyle}
        hintStyle={this.props.hintStyle}
        inputStyle={this.props.inputStyle}
        fullWidth={this.props.fullWidth}
        multiLine={this.props.multiLine}
        onBlur={this.blur}
        onFocus={this.focus}
      />
    );
  }
}

const AutoSavingTextField = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavingTextField);

export default AutoSavingTextField;