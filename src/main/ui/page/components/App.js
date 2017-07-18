import React, { Component } from "react";
import * as selectors from "../selectors";
import { PAGES } from "../constants";
import CharacterSection from "../../characters/_containers/CharacterSection";
import WelcomePage from "../../welcome/components/WelcomePage";
import { connect } from "react-redux";
import { palette, spacing } from "../../themes/PlotifyMainTheme";
import Snackbar from "../../snackbar/components/Snackbar";
import AboutDialog from "../../about/components/AboutDialog";
import { AppBar, Drawer, NavigationLink } from "../../mdl-components/Layout/";
import ActionMenu from "../_containers/ActionMenu";
import { IconButton } from "../../mdl-components/Buttons/";
import * as componentHandler from "../../resources/material";
import Navigation from "../_containers/Navigation";

const mapStateToProps = (state) => {
  return {
    currentPageId: selectors.getCurrentPageId(state),
    hasNavigation: selectors.hasCurrentPageNavigation(state),
    title:         selectors.getCurrentPageTitle(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class AppComponent extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    let page;
    switch (this.props.currentPageId) {
      case
      PAGES.CHARACTERS.id :
        page = <CharacterSection />;
        break;
      default:
        page = <WelcomePage />;
        break;
    }
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header ">
        <AppBar
          title={this.props.title}
          actionMenu={
            <div>
              <IconButton icon="more_vert" id="open-action-menu" />
              <ActionMenu
                anchorEl="open-action-menu"
              />
            </div>
          }
        />
        <Drawer title={this.props.title}>
          <Navigation />
        </Drawer>
        <main className="mdl-layout__content">
          {page}
        </main>

        <Snackbar />
        <AboutDialog />

      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default App;
