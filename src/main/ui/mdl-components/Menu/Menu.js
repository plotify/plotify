import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as componentHandler from "../../resources/material";

// todo add types for mld-menu--bottom-right (css classes for positioning) etc.
export default class Menu extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <ul
        className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
        htmlFor={ this.props.refId }
      >
        { this.props.children }
      </ul>
    );
  }
}

Menu.propTypes = {
  refId: PropTypes.string.isRequired,
};
