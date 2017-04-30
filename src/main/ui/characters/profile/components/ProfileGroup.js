import React, { Component } from "react";
import { Paper, TextField } from "material-ui";
import { spacing } from "../../../themes/PlotifyMainTheme";

const styles = {
  paper: {
    margin: spacing.iconSize,
    padding: spacing.desktopGutterLess,
  },
  floatingLabelFocusStyle: {
    zIndex: 0,
  },
  floatingLabelStyle: {
    zIndex: 0,
  },
  underlineFocusStyle: {}
};

class ProfileGroupComponent extends Component {

  render() {
    return (
      <Paper zDepth={1} style={styles.paper}>
        <h3>{this.props.title}</h3>
        {
          this.props.entries.map((entry) => {
            return <TextField
              key={entry.id}
              floatingLabelText={entry.title}
              value={entry.value}
              fullWidth={true}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            />

          })
        }

      </Paper>
    );
  }
}

export default ProfileGroupComponent;
