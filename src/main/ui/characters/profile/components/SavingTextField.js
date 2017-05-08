import React, { Component } from "react";
import { CircularProgress, RadioButton, RadioButtonGroup, TextField } from "material-ui";
import ActionDone from "material-ui/svg-icons/action/done";
import AlertError from "material-ui/svg-icons/alert/error";
import { green500, red500 } from "material-ui/styles/colors";
import FadingSuccessIcon from "./FadingSuccessIcon";

export default class SavingTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIconVisible: false,
      saving: false,
      savingFailed: false,
      error: undefined,
    };
    this.setSaving = this.setSaving.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.setError = this.setError.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.value) {
      case "saving":
        this.setSaving();
        break;
      case "success":
        this.setSuccess();
        break;
      case "error":
        this.setError();
        break;
      case "none":
        this.setState({
          isIconVisible: false,
          saving: false,
          savingFailed: false,
          error: undefined,
        });
        break;
    }
  }

  setSaving() {
    this.setState({
      isIconVisible: true,
      saving: true,
      savingFailed: false,
      error: undefined,
    });
  }

  setSuccess() {
    this.setState({
      isIconVisible: true,
      saving: false,
      savingFailed: false,
      error: undefined,
    });
  }

  setError() {
    this.setState({
      isIconVisible: true,
      saving: false,
      savingFailed: true,
      error: "Fehler beim Speichern",
    });
  }

  render() {
    return (
      <div>
        <div style={{ position: "relative" }}>
          <TextField
            floatingLabelText="Label"
            defaultValue="Wert"
            fullWidth={true}
            multiLine={true}
            errorText={this.state.error}
          />
          <div style={{ position: "absolute", top: 36, right: 0 }}>

            <div style={
              this.state.isIconVisible && this.state.saving ?
              {} : { display: "none" }
            }>
              <CircularProgress size={24} thickness={2} key={2}/>
            </div>
            {
              this.state.isIconVisible && !this.state.saving && !this.state.savingFailed &&
              <FadingSuccessIcon key={1}/>
            }
            {
              this.state.isIconVisible && !this.state.saving && this.state.savingFailed &&
              <AlertError color={red500} key={3}/>
            }
          </div>
        </div>

        <RadioButtonGroup name="savingState" defaultSelected="none" onChange={this.handleChange}>
          <RadioButton
            value="none"
            label="None"/>

          <RadioButton
            value="saving"
            label="Saving"/>

          <RadioButton
            value="success"
            label="Success"/>

          <RadioButton
            value="error"
            label="Error"/>
        </RadioButtonGroup>
      </div>
    );
  }
}
