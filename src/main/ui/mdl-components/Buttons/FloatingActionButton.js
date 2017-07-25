import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class FloatingActionButton extends PureComponent {

  render() {
    return (
      <button
        className="mdl-button
                   mdl-js-button
                   mdl-button--fab
                   mdl-js-ripple-effect
                   mdl-button--colored
                   mdl-color--primary
                   mdl-color-text--primary-contrast"
        onClick={ this.props.action }>
        <span className="material-icons">{ this.props.icon }</span>
      </button>
    );
  }

}

FloatingActionButton.propTypes = {
  action: PropTypes.func.isRequired,
  icon:   PropTypes.string.isRequired,
};
