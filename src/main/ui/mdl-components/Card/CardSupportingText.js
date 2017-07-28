import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class CardSupportingText extends PureComponent {
  render() {
    return (
      <div className="mdl-card__supporting-text">
        { this.props.children }
      </div>
    );
  }
}

CardSupportingText.propTypes = {};

CardSupportingText.defaultProps = {};
