import React, { Component } from "react";
import CharacterList from "../list/components/CharacterList";
import { connect } from "react-redux";
import { isCharacterSelected } from "../list/selectors";
import CharacterProfile from "./CharacterProfile";
import { white } from "material-ui/styles/colors";
import { FloatingActionButton, Paper } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import { spacing } from "../../themes/PlotifyMainTheme";
import SearchBar from "./SearchBar";

const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  listWrapper: {
    position: "relative",
    height: "100%",
    flexGrow: 1,
    zIndex: 2,
    background: white,
    //overflowY: "auto",
  },
  profile: {
    position: "relative",
    height: "100%",
    flexGrow: 4,
  },
  addCharacterButtonLeft: {
    position: "absolute",
    color: white,
    right: spacing.desktopToolbarHeight / 2,
    top: 36,
    /*marginLeft: "calc(50% - " + spacing.iconSize + "px)",*/
    /*bottom: 24,*/
  },
  addCharacterButton: {
    position: "absolute",
    color: white,
    left: spacing.desktopToolbarHeight * -1 / 2,
    marginLeft: "calc(50% - " + spacing.iconSize + "px)",
    bottom: 24,
  }
};

class CharacterPageComponent extends Component {
  render() {
    return (
      <div id="CharacterPage" style={styles.root}>
        <Paper zDepth={1} style={styles.listWrapper}>
          <SearchBar/>
          <CharacterList />
          <FloatingActionButton style={styles.addCharacterButton}>
            <ContentAdd  />
          </FloatingActionButton>
        </Paper>

        <div style={styles.profile}>
          {
            this.props.isCharacterSelected &&
            <CharacterProfile/>
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