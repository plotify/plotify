import React, { Component } from "react";
import CharacterList from "../list/components/CharacterList";
import { connect } from "react-redux";
import { isCharacterSelected } from "../list/selectors";
import CharacterProfile from "./CharacterProfile";
import { white } from "material-ui/styles/colors";
import { FloatingActionButton, Paper } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import { spacing } from "../../themes/PlotifyMainTheme";

const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
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
    flexGrow: 3,
  },
  addCharacterButton: {
    position: "absolute",
    color: white,
    marginLeft: "calc(50% - " + spacing.iconSize + "px)",
    bottom: 24,
  }
};

class CharacterPageComponent extends Component {
  render() {
    return (
      <div id="CharacterPage" style={styles.root}>
        <Paper zDepth={1} style={styles.listWrapper}>
          <CharacterList />
          <FloatingActionButton style={styles.addCharacterButton}>
            <ContentAdd  />
          </FloatingActionButton>
        </Paper>
        {
          this.props.isCharacterSelected &&
          <div style={styles.profile}>
            <CharacterProfile/>
          </div>
        }
      </div>
    );
  }
}

const CharacterPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPageComponent)

export default CharacterPage;