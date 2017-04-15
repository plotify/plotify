import React from "react";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {canRedoCharacterChange, canUndoCharacterChange, updateCharacter} from "../../../service/actions";
import {palette} from "../../../themes/PlotifyMainTheme";

const mapStateToProps = (state) => {
  return {
    characterId: state.selectedCharacter.id,
    initialValue: state.selectedCharacter.name,
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
    onSave: (characterId, changeType, typeId, name) => {
      dispatch(updateCharacter(characterId, changeType, typeId, name));
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
      this.props.onSave(
        this.props.characterId,
        this.props.changeType,
        this.props.typeId,
        this.props.value);
      this.props.onCanUndo(this.props.characterId);
      this.props.onCanRedo(this.props.characterId);
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