import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { NavigationLink } from "../../mdl-components/Layout/";

export default class Divider extends PureComponent {
  render() {
    return (
      <NavigationLink
        caption=""
        onClick={ () => {} }
        dividing />
    );
  }
}

Divider.propTypes = {};

Divider.defaultProps = {};
