import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatButton } from "./FlatButton";

export class RaisedButton extends PureComponent {
  render() {
    const otherProps = Object.assign({}, this.props);
    delete otherProps.className;
    return (
      <FlatButton className="mdl-button--raised" { ...otherProps } />
    )
  }
}

RaisedButton.propTypes = {
  label:      PropTypes.string,
  disabled:   PropTypes.bool,
  onTouchTap: PropTypes.func,
  primary:    PropTypes.bool,
  secondary:  PropTypes.bool,
};

RaisedButton.defaultProps = {
  disabled:  false,
  primary:   false,
  secondary: false,
};
