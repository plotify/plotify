import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class Tooltip extends PureComponent {
  render() {
    return (
      <div className="mdl-tooltip" htmlFor={ this.props.for }>
        { this.props.caption }
      </div>
    );
  }
}

Tooltip.propTypes = {
  for:      PropTypes.any.isRequired,
  caption: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {};
