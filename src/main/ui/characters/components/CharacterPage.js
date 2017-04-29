import React, { Component } from "react";
import CharacterList from "../list/components/CharacterList";
import { connect } from "react-redux";
import profile from "../profile";
import CharacterProfile from "../profile/components/CharacterProfile";
import { white } from "material-ui/styles/colors";
import { FloatingActionButton, Paper } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import { spacing } from "../../themes/PlotifyMainTheme";
import SearchBar from "./SearchBar";

const mapStateToProps = (state) => {
  return {
    isProfileVisible: profile.selectors.isVisible(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
  },
  listPaper: {
    position: "absolute",
    height: "100%",
    zIndex: 2,
    background: white,
    minWidth: 350,
    width: 350,
    display: "inline-block",
  },
  profile: {
    position: "absolute",
    height: "100%",
    left: 406,
    right: 0,
  },
  addCharacterButtonLeft: {
    position: "absolute",
    color: white,
    right: spacing.desktopToolbarHeight / 2,
    top: 36,
  },
  addCharacterButton: {
    position: "absolute",
    color: white,
    left: spacing.desktopToolbarHeight * -1 / 2,
    marginLeft: "50%",
    bottom: 24,
  }
};

class CharacterPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO Try to dynamically receive the height of the SearchBar.
      searchBarHeight: 48,
    };
  }

  render() {
    return (
      <div id="CharacterPage" style={styles.root}>
        <Paper zDepth={1} style={styles.listPaper}>
          <SearchBar />
          <div style={{
            height: "calc(100% - " + this.state.searchBarHeight + "px)",
          }}>
            <CharacterList />
          </div>
          <FloatingActionButton style={styles.addCharacterButton}>
            <ContentAdd  />
          </FloatingActionButton>
        </Paper>

        <div style={styles.profile}>
          {
            this.props.isProfileVisible &&
            <CharacterProfile/>
          }
          { !this.props.isProfileVisible &&
          <div>
            <img
              src="https://img.memecdn.com/sad-owl-is-sad_o_234355.webp"/>
            <h1>Kein Charakter ausgewählt</h1>
          </div>
          }
        </div>

      </div>
    );
  }
}

const CharacterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPageComponent)

export default CharacterPage;