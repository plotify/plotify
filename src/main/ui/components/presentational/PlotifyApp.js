import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import ActionDelete from "material-ui/svg-icons/action/delete";
import ContentRedo from "material-ui/svg-icons/content/redo";
import ContentUndo from "material-ui/svg-icons/content/undo";
import {palette, spacing} from "../../themes/PlotifyMainTheme";
import MainNavigation from "../containers/MainNavigation";
import {Profile} from "../character/Profile";
import ActionMenu from "./ActionMenu";
import WelcomeSection from "../containers/mixed/WelcomeSection";
import TrashSection from "../containers/TrashSection";
import Sections from "../../constants/sections";
import CharacterList from "./CharacterList";
import {CircularProgress} from "material-ui";


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
      marginRight: 0,
      paddingRight: 0
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
  mainNavigation: {},
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
  },
  loading: {
    position: "absolute",
    height: "100%",
    width: "100%",
    background: "white",
    opacity: 0.5,
    zIndex: 2,
    spinner: {
      position: "relative",
      top: "50%",
      left: "50%",
      marginTop: -40,
      marginLeft: -40,
    }
  },
};

export default class PlotifyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionMenu: {
        open: false,
      },
    };
    this.toggleActionMenu = this.toggleActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
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
    switch (this.props.currentSection) {
      case Sections.CHARACTER:
        content =
          <span>
            <div style={styles.columns.col2}>
              <CharacterList
                characters={[
                  {
                    id: "123",
                    name: "Rumpelstielzchen",
                  },
                  {
                    id: "2345",
                    name: "Jasper"
                  }
                ]}
              />
            </div>
            <div style={styles.columns.col3}>
              <Profile />
            </div>
          </span>;
        break;
      case Sections.TRASH:
        content = <TrashSection />;
        break;
      default:
        content = <WelcomeSection />;
        break;

    }


    return (
      <div id="PlotifyApp">
        <AppBar
          title={this.props.currentSection.title}
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
            />
          </div>
          {
            this.props.sectionIsLoading &&
            <div style={styles.loading}>
              <CircularProgress size={80} thickness={5} style={styles.loading.spinner}/>
            </div>
          }

          {content}

        </div>
      </div>
    );
  }
}
