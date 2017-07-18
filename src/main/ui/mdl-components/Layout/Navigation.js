import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export class Navigation extends PureComponent {
  render() {
    const screenClass = this.props.hideOnSmallScreens ? "mdl-layout--large-screen-only" : "";
    return (
      <nav className={ classNames("mdl-navigation", screenClass)}>
        { this.props.children }
      </nav>
    );
  }
}

Navigation.propTypes = {
  hideOnSmallScreens: PropTypes.bool.isRequired,
};

Navigation.defaultProps = {
  hideOnSmallScreens: true,
};
