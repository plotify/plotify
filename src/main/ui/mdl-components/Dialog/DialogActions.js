import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class DialogActions extends PureComponent {
  render() {
    return (
      <div className="mdl-dialog__actions">
        { this.props.actions }
      </div>
    );
  }
}

DialogActions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.element),
};

DialogActions.defaultProps = {};
