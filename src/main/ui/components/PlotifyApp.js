import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

//---- MATERIAL UI START
import CharacterList from "./character/CharacterList";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentRedo from "material-ui/svg-icons/content/redo";
import ContentUndo from "material-ui/svg-icons/content/undo";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
//---- MATERIAL UI COMPONENTS END

//---- INTERNALS START
import packageJson from "../../package.json";
import MainNavigation from "./MainNavigation";
//---- INTERNALS END

/*
import { sendMessageToMain } from "../../shared/commons/ipc";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";

sendMessageToMain(CREATE_STORY, (event, payload) => {
  console.log("New story: " + payload);
});
*/

const characterDetailStyles = {
  panel: {
    padding: 15,
    height: "auto",
    width: 300,
    margin: 20,
    display: "inline-block"
  }
};

const appBarStyles = {
  color: "#fff",
  toolbar: {
    background: "none",
    color: "#fff",
    marginRight: 0
  }
};

export default class PlotifyApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigationOpen: false,
    };
    this.toggleMainNavigation = this.toggleMainNavigation.bind(this);
    this.closeMainNavigation = this.closeMainNavigation.bind(this);
  }

  toggleMainNavigation() {
    this.setState({
      navigationOpen: !this.state.navigationOpen
    });
  }

  closeMainNavigation() {
    this.setState({
      navigationOpen: false
    });
  }

  render() {
    return(
      <div id="PlotifyApp">
        <AppBar
          title={packageJson.productName}
          style={appBarStyles}
          onLeftIconButtonTouchTap={this.toggleMainNavigation}>
          <Toolbar style={appBarStyles.toolbar}>
            <ToolbarGroup>
              <IconButton tooltip="Undo">
                <ContentUndo color="white"/>
              </IconButton>
              <IconButton tooltip="Redo">
                <ContentRedo color="white"/>
              </IconButton>
              <IconButton tooltip="Delete">
                <ActionDelete color="white"/>
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          </AppBar>

          <MainNavigation
              open={this.state.navigationOpen}
              docked={false}
              onRequestChange={(navigationOpen) => this.setState({navigationOpen})}
              />

          <div id="ContentWrapper" onClick={this.closeMainNavigation}>

            <CharacterList />

            <div id="CharacterDetails" style={characterDetailStyles}>
              <Paper style={characterDetailStyles.panel} zDepth={1}>
                <TextField
                  hintText="Gebe hier den Namen ein"
                  floatingLabelText="Name"
                />
              </Paper>
              <br/>
              <Paper style={characterDetailStyles.panel} zDepth={1}>
                <TextField
                  hintText=""
                  floatingLabelText="Körpergröße"
                />
                <TextField
                  hintText=""
                  floatingLabelText="Augenfarbe"
                />
              </Paper>
            </div>
          </div>

      </div>
    );
  }
}
