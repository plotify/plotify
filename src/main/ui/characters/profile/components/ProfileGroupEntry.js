import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "../selectors";
import * as a from "../actions";
import { CircularProgress, RadioButton, RadioButtonGroup, TextField } from "material-ui";
import { red500 } from "material-ui/styles/colors";
import FadingSuccessIcon from "./FadingSuccessIcon";
import AlertError from "material-ui/svg-icons/alert/error";
import StatusTextField from "./StatusTextField";

const makeMapStateToProps = () => {
  const hasEntryValueChanged = s.makeHasEntryValueChanged();
  const getEntryValue = s.makeGetEntryValue();
  const isEntrySaving = s.makeIsEntrySaving();
  const isEntrySavingFailed = s.makeIsEntrySavingFailed();
  const getEntrySavingError = s.makeGetEntrySavingError();

  const mapStateToProps = (state, props) => {
    return {
      value: getEntryValue(state, props),
      hasValueChanged: hasEntryValueChanged(state, props),
      isSaving: isEntrySaving(state, props),
      isSavingFailed: isEntrySavingFailed(state, props),
      savingError: getEntrySavingError(state, props),
    };
  };
  return mapStateToProps;
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
      iconVisible: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.onIconHideRequest = this.onIconHideRequest.bind(this);
  }

  onIconHideRequest() {
    this.setState({
      iconVisible: false,
    });
  }

  getValue() {
    return this.props.value;
  }

  getSavingError() {
    return this.props.savingError;
  }

  handleBlur(value) {
    Promise.resolve()
    .then(() => this.props.setEntryValue(this.props.entryId, value))
    .then(() => {
      if (this.props.hasValueChanged) {
        this.setState({
          iconVisible: true,
        });
      }
    })
    .then(() => this.props.saveEntryValue(this.props.entryId));
  }

  render() {
    return(
      <StatusTextField
        floatingLabelText={this.props.title}
        value={this.getValue()}
        fullWidth={true}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        multiLine={true}
        errorText={typeof this.getSavingError() === Object ? "" : this.getSavingError()}
        onBlur={this.handleBlur}
        isLoading={this.props.isSaving}
        isSuccessFul={
          !this.props.isSaving &&
          !this.props.isSavingFailed
        }
        isError={!this.props.isSaving && this.props.isSavingFailed}
        iconVisible={this.state.iconVisible}
        iconHideRequest={this.onIconHideRequest}
      />
    );
  }
}

const ProfileGroupEntry = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ProfileGroupEntryComponent);

export default ProfileGroupEntry;
