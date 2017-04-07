import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

//---- MATERIAL UI START
//------ COMPONENTS START
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
//------ COMPONENTS END
//------ ICONS START
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentRedo from "material-ui/svg-icons/content/redo";
import ContentUndo from "material-ui/svg-icons/content/undo";
import CommunicationChatBubble from "material-ui/svg-icons/communication/chat-bubble";
//------ ICONS END
//---- MATERIAL UI END

//---- INTERNALS START
import packageJson from "../../package.json";
//------ LAYOUT START
import PlotifyMainTheme, { spacing, palette } from "../themes/PlotifyMainTheme";
//------ LAYOUT END
//------ COMPONENTS START
import MainNavigation from "./MainNavigation";
import CharacterList from "./character/CharacterList";
import CharacterDetail from "./character/CharacterDetail";
import ActionMenu from "./menu/ActionMenu";
import StartPage from "./StartPage";
//------ COMPONENTS START
//------ SHARED START
import Pages from "../../shared/constants/pages";
//------ SHARED END
//---- INTERNALS END

/*
import { sendMessageToMain } from "../../shared/commons/ipc";
import { CREATE_STORY } from "../../shared/stories/ipc-channels";

sendMessageToMain(CREATE_STORY, (event, payload) => {
  console.log("New story: "  payload);
});
*/

const styles = {
  appBar: {
    position: "absolute",
    color: "#fff",
    toolbar: {
      background: "none",
      color: "#fff",
      marginRight: 0
    }
  },
  contentWrapper: {
    position: "fixed",
    overflow: "hidden",
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
      height: "100%",
      overflow: "hidden",
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderColor: palette.borderColor,
    },
    col2: {
      float: "left",
      borderRightWidth: 1,
      borderRightStyle: "solid",
      borderColor: palette.borderColor,
      height: "100%",
      width: 340,
    },
    col3: {
      position: "relative",
      float: "left",
      width: "calc(100% - 396px)",
      height: "100%",
    }
  }
};

export default class PlotifyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: Pages.START,
      actionMenu: {
        open: false,
      },
      character: {
        active: 1,
      },
    };
    this.toggleActionMenu = this.toggleActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({currentPage: page});
  }

  closeActionMenu() {
    this.setState({
      actionMenu: {
        open: false
      }
    });
  }

  toggleActionMenu(event) {
    event.preventDefault();
    this.setState({
      actionMenu: {
        open: !this.state.actionMenu.open,
        anchorEl: event.currentTarget
      }
    });
  }

  render() {

    let content = "";
    switch (this.state.currentPage) {
      case Pages.CHARACTER:
        content =
          <span>
            <div style={styles.columns.col2}>
              <CharacterList />
            </div>
            <div style={styles.columns.col3}>
              <CharacterDetail characterId={this.state.character.active}/>
            </div>
          </span>;
        break;
      case Pages.TRASH:
        content =
          <span>
            trash
          </span>;
        break;
      default:
          content =
          <div style={styles.columns.col2Full}>
            <StartPage />
          </div>;
        break;

    }

    return(
      <div id="PlotifyApp">
        <AppBar
          title={this.state.currentPage.title}
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.toggleActionMenu}>
          <ActionMenu
            open={this.state.actionMenu.open}
            anchorEl={this.state.actionMenu.anchorEl}
            onRequestClose={this.closeActionMenu}/>

          <Toolbar style={styles.appBar.toolbar}>
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
                currentPage={this.state.currentPage}
                changePage={this.changePage}
              />
            </div>

            {content}

          </div>
      </div>
    );
  }
}
