import React, { Component } from "react";
import { Paper } from "material-ui";
import { spacing } from "../../../themes/PlotifyMainTheme";
import SavingTextField from "./SavingTextField";
import ProfileGroupEntry from "./ProfileGroupEntry";

const styles = {
  paper: {
    margin: spacing.iconSize,
    padding: spacing.desktopGutterLess,
  }
};

class ProfileGroupComponent extends Component {

  render() {
    return (
      <Paper zDepth={1} style={styles.paper}>
        <h3>{this.props.title}</h3>
        {
          this.props.entries.map((entry) => {
            return (
              <ProfileGroupEntry
                id={entry.id}
                title={entry.title}
                key={entry.id}/>
            );
          })
        }
      </Paper>
    );
  }
}

export default ProfileGroupComponent;
