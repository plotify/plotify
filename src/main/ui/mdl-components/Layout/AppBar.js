import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as componentHandler from "../../resources/material";

export class AppBar extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleActionMenu = this.toggleActionMenu.bind(this);
    this.state = {
      menuOpen: false,
    };
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  toggleActionMenu() {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
    console.log("toggleActionMenu() open?", this.state.menuOpen);
  }

  render() {
    return (
      <header className="mdl-layout__header mdl-color--primary">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            { this.props.title }
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation">
            {
              this.props.actionMenu
              &&
              this.props.actionMenu
            }
          </nav>
        </div>
      </header>
    );
  }
}

AppBar.proptypes = {
  title:      PropTypes.string.isRequired,
  actionMenu: PropTypes.element,
};
