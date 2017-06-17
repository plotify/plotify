import React, { Component } from "react";

import { white } from "material-ui/styles/colors";
import { FloatingActionButton, Paper } from "material-ui";
import { CircularProgress } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";

import { spacing } from "../../themes/PlotifyMainTheme";

import FilterableCharactersList from "../list/components/FilterableCharactersList";
import CharacterProfile from "../profile/components/CharacterProfile";

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

export default class CharacterPageComponent extends Component {
  render() {
    return (
      <div id="CharacterPage" style={styles.root}>
        <Paper zDepth={1} style={styles.listPaper}>
          <FilterableCharactersList />
          <FloatingActionButton style={styles.addCharacterButton}>
            <ContentAdd  />
          </FloatingActionButton>
        </Paper>

        <div style={styles.profile}>
          <CharacterProfile/>
        </div>
      </div>
    );
  }
}
