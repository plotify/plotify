import React from "react";
import ReactDOM from "react-dom";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import TextField from "material-ui/TextField";

import ContentAdd from "material-ui/svg-icons/content/add";
// import ContentDelete from "material-ui/svg-icons/content/delete";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import SocialPerson from "material-ui/svg-icons/social/person";
import ActionSearch from "material-ui/svg-icons/action/search";

import packageJson from "../../package.json";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { sendMessageToMain } from "../../shared/commons/ipc";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";


sendMessageToMain(CREATE_STORY, (event, payload) => {
  console.log("New story: " + payload);
});

const styles = {
  title: {
    cursor: "pointer",
  },
};

const letterAvatarStyle = {
  margin: 5
};

const mainNavigationStyle = {
  width: "20%",
  float: "left"
};

const characterListStyle = {
  float: "left",
  width: "auto"
};

const searchBarStyles = {
  background: "#fff",
  icon: {
    color: "blue",
    margin: 5
  }
};

export default class PlotifyApp extends React.Component {
  render() {
    return(
      <div id="PlotifyApp">
        <AppBar
          title={packageJson.productName}
          iconElementRight={<IconButton tooltip="Redo"><NavigationRefresh /></IconButton>}
          />

          <div id="MainNavigation" style={mainNavigationStyle}>
            <List>
               <ListItem
                 primaryText="Charaktere"
                 leftIcon={<SocialPerson />}
               />
            </List>
          </div>

          <div id="CharacterList" style={characterListStyle}>
            <Toolbar style={searchBarStyles}>
              <ToolbarGroup>
                <ActionSearch style={searchBarStyles.icon} />
                <TextField
                  hintText="Suche"
                />
              </ToolbarGroup>
            </Toolbar>
            <List>
               <Subheader>Charaktere</Subheader>
               <ListItem
                 primaryText="Rumpelstielzchen"
                 leftAvatar={
                   <Avatar
                     size={30}
                     style={letterAvatarStyle}>
                     R
                   </Avatar>
                 }
               />
            </List>
          </div>

      </div>
    );
  }
}
