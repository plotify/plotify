import React from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import ActionSettings from "material-ui/svg-icons/action/settings";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import {createStory, openStoryDialog} from "../../../service/actions";
import {connect} from "react-redux";


class CustomMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateStory = this.handleCreateStory.bind(this);
    this.handleOpenStory = this.handleOpenStory.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
  }

  handleCreateStory(event) {
    this.props.onRequestClose();
    this.props.onCreateStory();
  }

  handleOpenStory(event) {
    this.props.onRequestClose();
    this.props.onOpenStory();
  }

  handleSettings(event) {
    this.props.onRequestClose();
  }

  handleAbout(event) {
    this.props.onRequestClose();
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{horizontal: "left", vertical: "bottom"}}
        targetOrigin={{horizontal: "left", vertical: "top"}}
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
            primaryText="Einstellungen"
            onTouchTap={this.handleSettings}
            leftIcon={<ActionSettings/>}
          />
          <MenuItem
            primaryText="Über Plotify"
            onTouchTap={this.handleAbout}
            leftIcon={<ActionInfo/>}/>
        </Menu>
      </Popover>
    );
  }
}

// TODO
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStory: () => {
      dispatch(createStory());
    },
    onOpenStory: () => {
      dispatch(openStoryDialog());
    }
  };
};

const ActionMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMenu);

export default ActionMenu;
