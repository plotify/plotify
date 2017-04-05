import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

//---- MATERIAL UI START
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentRedo from "material-ui/svg-icons/content/redo";
import ContentUndo from "material-ui/svg-icons/content/undo";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import spacing from "material-ui/styles/spacing";
//---- MATERIAL UI END

//---- INTERNALS START
import packageJson from "../../package.json";
import MainNavigation from "./MainNavigation";
import CharacterList from "./character/CharacterList";
import CharacterDetail from "./character/CharacterDetail";
//---- INTERNALS END

/*
import { sendMessageToMain } from "../../shared/commons/ipc";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";

sendMessageToMain(CREATE_STORY, (event, payload) => {
  console.log("New story: " + payload);
});
*/

const styles = {
  contentWrapper: {
    position: "fixed",
    overflow: "auto",
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainNavigation: {

  },
  columns: {
    col1: {
      float: "left",
      width: spacing.desktopGutter + spacing.desktopGutterLess * 2,
      borderRight: "1px solid #c2c2c2",
      height: "100%",
      overflow: "hidden"
    },
    col2: {
      float: "left",
      borderRight: "1px solid #c2c2c2",
      height: "100%",
      width: 340,
    },
    col3: {
      float: "left",
      width: "auto",
      height: "100%",
    }
  }
};

const appBarStyles = {
  position: "absolute",
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
      character: {
        active: 1,
      },
      navigation: {
        active: 1
      }
    };
  }

  render() {
    return(
      <div id="PlotifyApp">
        <AppBar
          title={packageJson.productName}
          style={appBarStyles}>
          <Toolbar style={appBarStyles.toolbar}>
            <ToolbarGroup>
              <IconButton tooltip="Rückgängig">
                <ContentUndo color="white"/>
              </IconButton>
              <IconButton tooltip="Wiederherstellen">
                <ContentRedo color="white"/>
              </IconButton>
              <IconButton tooltip="Löschen">
                <ActionDelete color="white"/>
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          </AppBar>

          <div id="ContentWrapper" style={styles.contentWrapper}>

            <div style={styles.columns.col1}>
              <MainNavigation
                style={styles.mainNavigation}
                active={this.state.navigation.active}
              />
            </div>
            <div style={styles.columns.col2}>
              <CharacterList />
            </div>
            <div style={styles.columns.col3}>
              <CharacterDetail characterId={this.state.character.active}/>
            </div>
          </div>
      </div>
    );
  }
}
