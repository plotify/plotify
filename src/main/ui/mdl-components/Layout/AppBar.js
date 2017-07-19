import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as componentHandler from "../../resources/material";

export class AppBar extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <header className="mdl-layout__header mdl-color--primary" style={{
        display: this.props.visible ? "block" : "none",
      }}>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            { this.props.title }
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation">
            { this.props.actionMenu }
          </nav>
        </div>
      </header>
    );
  }
}

AppBar.proptypes = {
  title:      PropTypes.string.isRequired,
  actionMenu: PropTypes.element,
  visible:    PropTypes.bool,
};
