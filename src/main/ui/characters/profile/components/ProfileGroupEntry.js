import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "../selectors";
import * as a from "../actions";
import { CircularProgress, RadioButton, RadioButtonGroup, TextField } from "material-ui";
import { red500 } from "material-ui/styles/colors";
import FadingSuccessIcon from "./FadingSuccessIcon";
import AlertError from "material-ui/svg-icons/alert/error";
import StatusTextField from "./StatusTextField";

const mapStateToProps = (state) => {
  return {
    value: (entryId) => s.getEntryValue(state, entryId),
    hasValueChanged: (entryId) => s.hasEntryValueChanged(state, entryId),
    isSaving: (entryId) => s.isEntrySaving(state, entryId),
    isSavingFailed: (entryId) => s.isEntrySavingFailed(state, entryId),
    savingError: (entryId) => s.getEntrySavingError(state, entryId),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveEntryValue: (id) => dispatch(a.saveEntryValue(id)),
    setEntryValue: (entryId, changedValue) => dispatch(a.setEntryValue(entryId, changedValue)),
  };
};

const styles = {
  floatingLabelFocusStyle: {
    zIndex: 0,
  },
  floatingLabelStyle: {
    zIndex: 0,
  },
  underlineFocusStyle: {}
};

class ProfileGroupEntryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSaving: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  getValue() {
    return this.props.value(this.props.id);
  }

  getSavingError() {
    return this.props.savingError(this.props.id);
  }

  handleChange(event) {
    //this.props.setEntryValue(this.props.id, event.target.value);
  }

  handleBlur(event) {
    this.props.setEntryValue(this.props.id, event.target.value);
    this.props.saveEntryValue(this.props.id);
  }

  render() {
    return(
      <StatusTextField
        floatingLabelText={this.props.title}
        defaultValue={this.getValue()}
        fullWidth={true}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        multiLine={true}
        errorText={this.getSavingError()}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        isLoading={this.props.isSaving(this.props.id)}
        isSuccessFul={
          !this.props.isSaving(this.props.id) &&
          !this.props.isSavingFailed(this.props.id)
        }
        isError={!this.props.isSaving(this.props.id) && this.props.isSavingFailed(this.props.id)}
      />
    );
  }
}

const ProfileGroupEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileGroupEntryComponent);

export default ProfileGroupEntry;
