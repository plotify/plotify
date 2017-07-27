import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";
import * as componentHandler from "../../resources/material";
import { Tooltip } from "../Tooltip";

export class IconButton extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <span>
        <button
          id={ this.props.id }
          disabled={ this.props.disabled }
          className="mdl-button mdl-js-button mdl-button--icon"
          onClick={ this.props.action }
        >
          <span className="material-icons">{ this.props.icon }</span>
        </button>
        {
          this.props.tooltip &&
          <Tooltip for={ this.props.id } caption={ this.props.tooltip } />
        }
      </span>

    );
  }
}

IconButton.propTypes = {
  icon:     PropTypes.string.isRequired,
  tooltip:  PropTypes.string,
  id:       requiredIf(PropTypes.any, props => props.tooltip),
  disabled: PropTypes.bool,
  action:   PropTypes.func,
};

IconButton.defaultProps = {
  disabled: false,
};
