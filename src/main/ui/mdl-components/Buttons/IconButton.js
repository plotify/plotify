import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import requiredIf from "react-required-if";
import * as componentHandler from "../../resources/material";

export default class IconButton extends PureComponent {
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
          <div className="mdl-tooltip" htmlFor={ this.props.id }>
            { this.props.tooltip }
          </div>
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
