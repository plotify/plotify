import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class CardTitle extends PureComponent {
  render() {
    return (
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">
          { this.props.children }
        </h2>
      </div>
    );
  }
}

CardTitle.propTypes = {
  children: PropTypes.string.isRequired
};

CardTitle.defaultProps = {};
