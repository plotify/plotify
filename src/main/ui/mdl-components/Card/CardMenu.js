import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class CardMenu extends PureComponent {
  render() {
    return (
      <div className="mdl-card__menu">
        { this.props.children }
      </div>
    );
  }
}

CardMenu.propTypes = {};

CardMenu.defaultProps = {};
