import React from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import FileFolder from "material-ui/svg-icons/file/folder";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import { connect } from "react-redux";

import story from "../../story";
import about from "../../about";

const mapStateToProps = (state) => {
  return {
    noStoryOpen: story.selectors.isStoryOpen(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStory: () => {
      dispatch(story.actions.createStory());
    },
    onOpenStory: () => {
      dispatch(story.actions.openStoryDialog());
    },
    onOpenStoryFileLocation: () => {
      dispatch(story.actions.openStoryFileLocation());
    },
    onOpenAboutDialog: () => {
      dispatch(about.actions.showAboutDialog());
    }
  };
};


class ActionMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateStory = this.handleCreateStory.bind(this);
    this.handleOpenStory = this.handleOpenStory.bind(this);
    this.handleOpenStoryFileLocation = this.handleOpenStoryFileLocation.bind(this);
    this.handleOpenAboutDialog = this.handleOpenAboutDialog.bind(this);
  }

  handleCreateStory() {
    this.props.onRequestClose();
    this.props.onCreateStory();
  }

  handleOpenStory() {
    this.props.onRequestClose();
    this.props.onOpenStory();
  }

  handleOpenStoryFileLocation() {
    this.props.onRequestClose();
    this.props.onOpenStoryFileLocation();
  }

  handleOpenAboutDialog() {
    this.props.onRequestClose();
    this.props.onOpenAboutDialog();
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
        onRequestClose={this.props.onRequestClose}>
        <Menu>
          <MenuItem
            primaryText="Neue Geschichte"
            onTouchTap={this.handleCreateStory}
            leftIcon={<AvNewReleases/>}
          />
          <MenuItem
            primaryText="Geschichte öffnen"
            onTouchTap={this.handleOpenStory}
            leftIcon={<FolderOpen/>}
          />
          <Divider/>
          <MenuItem
            primaryText="Speicherort öffnen"
            onTouchTap={this.handleOpenStoryFileLocation}
            leftIcon={<FileFolder/>}
            disabled={!this.props.noStoryOpen}
          />
          <Divider/>
          <MenuItem
            primaryText="Über Plotify"
            onTouchTap={this.handleOpenAboutDialog}
            leftIcon={<ActionInfo/>}/>
        </Menu>
      </Popover>
    );
  }
}

const ActionMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionMenuComponent);

export default ActionMenu;
