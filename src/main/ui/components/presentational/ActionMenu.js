import React from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import ActionSettings from "material-ui/svg-icons/action/settings";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import {createStory, openStory} from "../../service/actions";
import {connect} from "react-redux";


class CustomMenu extends React.Component {
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
            onTouchTap={this.props.onCreateStory}
            leftIcon={<AvNewReleases/>}
          />
          <MenuItem
            primaryText="Geschichte öffnen"
            leftIcon={<FolderOpen/>}
          />
          <Divider/>
          <MenuItem
            primaryText="Einstellungen"
            leftIcon={<ActionSettings/>}
          />
          <MenuItem
            primaryText="Über Plotify"
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
    onOpenStory: (file) => {
      dispatch(openStory(file));
    }
  };
};

const ActionMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMenu);

export default ActionMenu;
