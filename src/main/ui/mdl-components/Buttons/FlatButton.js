import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class FlatButton extends PureComponent {
  render() {
    return (
      <div
        className={
          classNames("mdl-button", "mdl-js-button", "mdl-js-ripple-effect",
            {
              "mdl-button--primary":   this.props.primary,
              "mdl-button--secondary": this.props.secondary,
            },
            this.props.className,
          )
        }
        disabled={ this.props.disabled }
        onClick={ this.props.onTouchTap }>
        { this.props.label }
      </div>
    );
  }
}

FlatButton.propTypes = {
  label:      PropTypes.string,
  disabled:   PropTypes.bool,
  onTouchTap: PropTypes.func,
  primary:    PropTypes.bool,
  secondary:  PropTypes.bool,
};

FlatButton.defaultProps = {
  disabled:  false,
  primary:   false,
  secondary: false,
};
