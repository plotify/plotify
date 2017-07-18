import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import componentHandler from "../../resources/material";

export class TextField extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    let value = "";
    if (this.props.value) {
      value = this.props.value;
    }
    this.state = {
      value,
    };
  }

  componentDidMount() {
     componentHandler.upgradeDom();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  get getStyle() {
    return {
      width: this.props.fullWidth ? "100%" : "auto",
    };
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  handleBlur(event) {
    const value = event.target.value;
    this.props.onBlur(value);
  }

  render() {
    const tfId = `text-field-${this.props.id}`;
    return (
      <div
        className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
        style={ this.getStyle }
      >
        <input
          className="mdl-textfield__input"
          type="text"
          value={ this.state.value }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          id={ tfId }
        />
        <label
          className="mdl-textfield__label mdl-color-text--primary"
          htmlFor={ tfId }
        >
          { this.props.label }
        </label>
      </div>
    );
  }
}

TextField.propTypes = {
  onChange:  PropTypes.func,
  onFocus:   PropTypes.func,
  onBlur:    PropTypes.func,
  label:     PropTypes.any.isRequired,
  id:        PropTypes.string.isRequired,
  value:     PropTypes.any,
  fullWidth: PropTypes.bool.isRequired,
};

TextField.defaultProps = {
  fullWidth: false,
  onChange:  (value) => {
    console.log("Unset Property `onChange()`", value);
  },
  onBlur:    (value) => {
    console.log("Unset Property `onBlur()`", value);
  },
};
