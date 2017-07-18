import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Divider } from "../../mdl-components/Menu";
import * as componentHandler from "../../resources/material";

export default class FloatingMenu extends PureComponent {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <Menu refId={ this.props.anchorEl }>
        <MenuItem
          caption="Neue Geschichte"
          icon="add_circle"
          action={ this.props.onCreateStory }
        />
        <MenuItem
          caption="Geschichte Öffnen"
          icon="folder_open"
          action={ this.props.onOpenStory }
        />
        <Divider />
        <MenuItem
          caption="Speicherort Öffnen"
          disabled={ !this.props.isStoryOpen }
          icon="folder"
          action={ this.props.onOpenStoryFileLocation }
        />
        <MenuItem
          caption="Über Plotify"
          icon="info"
          action={ this.props.onOpenAboutDialog }
        />
      </Menu>
    );
  }
}

FloatingMenu .propTypes = {
  onCreateStory:           PropTypes.func.isRequired,
  onOpenStory:             PropTypes.func.isRequired,
  onOpenStoryFileLocation: PropTypes.func.isRequired,
  onOpenAboutDialog:       PropTypes.func.isRequired,
  isStoryOpen:             PropTypes.bool.isRequired,
  anchorEl:                PropTypes.string.isRequired,
};

FloatingMenu .defaultProps = {};
