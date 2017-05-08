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
      isIconVisible: this.props.iconVisible,
      value: this.props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    const { value } = this.state;
    Promise.resolve()
    .then(() => this.props.onBlur(value));
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

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    if (this.props.onChange !== undefined) {
      this.props.onChange(event);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const dirty = nextState.value !== this.state.value;
    const iconChanged = nextProps.iconVisible !== this.props.iconVisible;
    const newPropsValue = nextProps.value !== this.state.value;
    return dirty || iconChanged || newPropsValue;
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <TextField
          floatingLabelText={this.props.floatingLabelText}
          value={this.state.value}
          fullWidth={this.props.fullWidth}
          floatingLabelStyle={this.getMergedFloatingStyle()}
          floatingLabelFocusStyle={this.getMergedFloatginLabelFocusStyle()}
          underlineFocusStyle={this.props.underlineFocusStyle}
          style={this.props.style}
          inputStyle={this.props.inputStyle}
          multiLine={this.props.multiLine}
          errorText={this.props.errorText}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        {
          this.props.iconVisible &&
          <div style={{ position: "absolute", top: 36, right: 0 }}>
            {
              this.props.isLoading &&
              <CircularProgress size={24} thickness={2}/>
            }
            {
              // TODO only blend in when necessary
              this.props.isSuccessFul &&
              <FadingSuccessIcon handleRequestClose={this.props.iconHideRequest}/>
            }
            {
              this.props.isError &&
              <AlertError color={red500} />
            }
          </div>
        }
      </div>
    );
  }
}
