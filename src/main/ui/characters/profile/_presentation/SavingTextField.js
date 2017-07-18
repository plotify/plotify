import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TextField } from "../../../mdl-components/TextField";
import * as componentHandler from "../../../resources/material";

export default class SavingTextField extends PureComponent {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  handleChange(value) {
    this.props.onChange(this.props.id, value);
  }

  handleBlur(value) {
    this.props.onSave(this.props.id, value);
  }

  render() {
    return (
      <div className="plotify-saving-text-field">
        <TextField
          id={this.props.id}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.props.onFocus}
          label={this.props.title}
          value={this.props.value}
          fullWidth
        />
        {
          this.props.hasValueChanged && ""
        }
        {
          this.props.isSaving &&
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        }

        {
          this.props.savingError &&
          "error " + this.props.savingError.message
        }

      </div>
    );
  }
}

SavingTextField.propTypes = {
  onChange:        PropTypes.func,
  onFocus:         PropTypes.func,
  onSave:          PropTypes.func,
  title:           PropTypes.any.isRequired,
  id:              PropTypes.string.isRequired,
  value:           PropTypes.any,
  hasValueChanged: PropTypes.bool.isRequired,
  isSaving:        PropTypes.bool.isRequired,
  isSavingFailed:  PropTypes.bool.isRequired,
  savingError:     PropTypes.shape({
    message: PropTypes.string,
  }),
};

SavingTextField.defaultProps = {};
