import React, {PropTypes} from "react";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import {palette, spacing} from "../../../themes/PlotifyMainTheme";
import ChangeType from "../../../../shared/characters/change-type";
import {connect} from "react-redux";
import {updateCharacter} from "../../../service/actions";

// TODO in übergelagerte Komponente auslagern
const mapStateToProps = (state) => {
  return {
    characterId: state.selectedCharacter.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (characterId, changeType, typeId, name) => {
      dispatch(updateCharacter(characterId, changeType, typeId, name));
    }
  };
};

class SavingTextField extends React.Component {
  constructor(props) {
    super(props);
    this.blur = this.blur.bind(this);
  }

  componentDidMount() {
    console.log("FIELD UPDATE FOCUSSED?", this.props.focussed);
    if (this.props.focussed) {
      this.input.focus();
    }
  }

  blur() {
    this.input.blur();
    this.props.onSave(
      this.props.characterId,
      this.props.changeType,
      this.props.typeId,
      this.props.value);
  }

  render() {

    return (
      <TextField
        ref={(input) => {this.input = input}}
        floatingLabelText={this.props.floatingLabelText}
        value={this.props.value}
        onChange={this.props.onChange}
        style={this.props.style}
        floatingLabelStyle={this.props.floatingLabelStyle}
        floatingLabelFocusStyle={this.props.floatingLabelFocusStyle}
        underlineFocusStyle={this.props.underlineFocusStyle}
        underlineStyle={this.props.underlineStyle}
        hintStyle={this.props.hintStyle}
        inputStyle={this.props.inputStyle}
        onBlur={this.blur}
      />
    );
  }
}

const AutoSavingTextField = connect(
  mapStateToProps,
  mapDispatchToProps
)(SavingTextField);

export default AutoSavingTextField;

// SavingTextField.propTypes = {
//   characterId: ,
//   typeId: PropTypes.text.isRequired,
//   changeType: ChangeType,
//   value:,
//   key:,
// };

// let changes = {};
// changes[key] = value;