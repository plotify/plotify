import React from "react";
import ReactDOM from "react-dom";

//---- MATERIAL UI START
//------ COMPONENTS START
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
//------ COMPONENTS END
//------ ICONS START
import ActionInfo from "material-ui/svg-icons/action/info";
import ActionSettings from "material-ui/svg-icons/action/settings";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
//------ ICONS END
//---- MATERIAL UI END

/* Beispiel für das Erstellen und Öffnen einer neuen Geschichte:
import { sendToModel } from "../shared/commons/ipc";
import { CREATE_STORY, OPEN_STORY } from "../shared/stories/ipc-channels";
sendToModel(CREATE_STORY)
  .then(file => sendToModel(OPEN_STORY, file))
  .then(file => console.log("Story created and opened: " + file))
  .catch(error => console.log("Could not create or open story: " + error));
*/

export default class ActionMenu extends React.Component {
  render() {
    return(
      <Popover
          open={this.props.open}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{horizontal: "left", vertical: "bottom"}}
          targetOrigin={{horizontal: "left", vertical: "top"}}
          onRequestClose={this.props.onRequestClose}
        >
          <Menu>
            <MenuItem
              primaryText="Neue Geschichte"
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
