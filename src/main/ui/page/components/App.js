import React, { Component } from "react";
import PlotifyAppBar from "./AppBar";
import Navigation from "./Navigation";
import * as selectors from "../selectors";
import { PAGES } from "../constants";
import CharacterPage from "../../characters/components/CharacterPage";
import WelcomePage from "../../welcome/components/WelcomePage";
import { connect } from "react-redux";
import { palette, spacing } from "../../themes/PlotifyMainTheme";
import Snackbar from "../../snackbar/components/Snackbar";
import { white } from "material-ui/styles/colors";

const mapStateToProps = (state) => {
  return {
    currentPageId: selectors.getCurrentPageId(state),
    hasNavigation: selectors.hasCurrentPageNavigation(state),
    title: selectors.getCurrentPageTitle(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const styles = {
  app: {
    background: palette.accent2Color,
    height: "100%",
    width: "100%",
  },
  pageWrapper: {
    position: "fixed",
    overflow: "hidden",
    top: spacing.desktopKeylineIncrement,
    left: 0,
    right: 0,
    bottom: 0,
  },
  navigationWrapper: {
    width: spacing.desktopToolbarHeight,
    height: "100%",
    float: "left",
  },
  pageContentWrapper: {
    width: "calc(100% - " + spacing.desktopToolbarHeight + "px)",
    marginLeft: spacing.desktopToolbarHeight,
    height: "100%",
  },
};

class AppComponent extends Component {
  render() {
    let page;
    switch (this.props.currentPageId) {
      case
      PAGES.CHARACTERS.id :
        page = <CharacterPage />;
        break;
      default:
        page = <WelcomePage />;
        break;
    }
    return (
      <div id="PlotifyApp" style={styles.app}>
        <PlotifyAppBar title={this.props.title}/>

        <div style={styles.pageWrapper}>
          { this.props.hasNavigation &&
          <div style={styles.navigationWrapper}>
            <Navigation />
          </div>
          }
          <div style={styles.pageContentWrapper}>
            {page}
          </div>
        </div>

        <Snackbar />
      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
