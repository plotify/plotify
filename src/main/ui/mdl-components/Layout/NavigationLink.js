import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import requiredIf from "react-required-if";

export class NavigationLink extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

  render() {

    const disabled = this.props.disabled ? "disabled" : "";
    const active = this.props.active ? "active" : "";
    const dividing = this.props.dividing ? "dividing" : "";

    return (
      <a className={ classNames("mdl-navigation__link", disabled, active, dividing)}
         onClick={ this.handleClick }>
        {
          this.props.icon &&
          <span className="material-icons">{ this.props.icon }</span>
        }
        { this.props.caption }
      </a>
    );
  }
}

NavigationLink.propTypes = {
  caption:  PropTypes.string.isRequired,
  onClick:  requiredIf(PropTypes.func, props => !props.disabled),
  icon:     PropTypes.string,
  disabled: PropTypes.bool,
  dividing: PropTypes.bool,
  active:   PropTypes.bool,
};

NavigationLink.defaultProps = {
  disabled: false,
  dividing: false,
  active:   false,
};
