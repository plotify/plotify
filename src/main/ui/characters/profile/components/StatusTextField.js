import React, { Component } from "react";
import { CircularProgress, RadioButton, RadioButtonGroup, TextField } from "material-ui";
import { red500 } from "material-ui/styles/colors";
import FadingSuccessIcon from "./FadingSuccessIcon";
import AlertError from "material-ui/svg-icons/alert/error";

const styles = {
  floatingLabelFocusStyle: {
    zIndex: 0,
  },
  floatingLabelStyle: {
    zIndex: 0,
  },
  underlineFocusStyle: {}
};

// TODO proptypes
export default class StatusTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIconVisible: false,
    };
  }

  getMergedFloatingStyle() {
    return Object.assign({},
      styles.floatingLabelStyle,
      this.props.floatingLabelStyle
    );
  }

  getMergedFloatginLabelFocusStyle() {
    return Object.assign({},
      styles.floatingLabelFocusStyle,
      this.props.floatingLabelFocusStyle);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <TextField
          floatingLabelText={this.props.floatingLabelText}
          defaultValue={this.props.defaultValue}
          fullWidth={this.props.fullWidth}
          floatingLabelStyle={this.getMergedFloatingStyle()}
          floatingLabelFocusStyle={this.getMergedFloatginLabelFocusStyle()}
          underlineFocusStyle={this.props.underlineFocusStyle}
          style={this.props.style}
          inputStyle={this.props.inputStyle}
          multiLine={this.props.multiLine}
          errorText={this.errorText}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        />
        <div style={{ position: "absolute", top: 36, right: 0 }}>
          {
            // always visible
            this.props.isLoading &&
            <CircularProgress size={24} thickness={2} key={2}/>
          }
          {
            // TODO only blend in when necessary
            this.props.isSuccessFul &&
            <FadingSuccessIcon key={1}/>
          }
          {
            this.props.isError &&
            <AlertError color={red500} key={3}/>
          }
        </div>
      </div>
    );
  }
}
