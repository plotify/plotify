import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class MenuItem extends PureComponent {
  render() {
    return (
      <li
        className="mdl-menu__item"
        onClick={ this.props.action }
        disabled={ this.props.disabled }
      >
        {
          this.props.icon &&
          <i className="material-icons">{ this.props.icon }</i>
        }
        { this.props.caption }
      </li>
    );
  }
}

MenuItem.propTypes = {
  caption:  PropTypes.string.isRequired,
  action:   PropTypes.func,
  disabled: PropTypes.bool,
  icon:     PropTypes.string,
};

MenuItem.defaultProps = {
  action:   () => {
  },
  disabled: false,
};
