import React, { Component } from "react";
import PlotifyAppBar from "./AppBar";
import Navigation from "./Navigation";
import * as selectors from "../selectors";
import { PAGES } from "../constants";
import CharacterPage from "../../characters/components/CharacterPage";
import WelcomePage from "../../welcome/components/WelcomePage";
import { connect } from "react-redux";
import { spacing } from "../../themes/PlotifyMainTheme";

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
  contentWrapper: {
    position: "fixed",
    overflow: "hidden",
    top: spacing.desktopKeylineIncrement,
    left: 0,
    right: 0,
    bottom: 0,
  },
}

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
      <div id="PlotifyApp">
        <PlotifyAppBar title={this.props.title}/>

        <div style={ styles.contentWrapper }>
          { this.props.hasNavigation && <Navigation /> }
          {page}
        </div>

      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
