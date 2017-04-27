import React, { Component } from "react";
import { connect } from "react-redux";
import { isCharacterSelected } from "../list/selectors";
import { Paper, TextField } from "material-ui";
import ProfileGroupComponent from "./ProfileGroup";
import { palette, spacing } from "../../themes/PlotifyMainTheme";
import { white } from "material-ui/styles/colors";

const mapStateToProps = (state) => {
  return {
    isCharacterSelected: isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const styles = {
  nameHeader: {
    zIndex: 1,
    position: "relative",
    height: spacing.desktopToolbarHeight * 2,
    backgroundColor: palette.primary2Color,
    left: 0,
    right: 0,
    padding: spacing.desktopGutterLess,
  },
  nameInput: {
    inputStyle: {
      color: white,
    },
    floatingLabelFocusStyle: {
      color: white,
    },
    floatingLabelStyle: {
      color: white,
    },
    underlineFocusStyle: {
      borderColor: white,
    }
  },
};

const entryGroupWrapperStyle = {
  position: "relative",
  overflowY: "auto",
  left: 0,
  right: 0,
  height: "calc(100% - " + (styles.nameHeader.height) + "px)",
};

class CharacterProfileComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Paper rounded={false}
               zDepth={2}
               style={styles.nameHeader}>
          <TextField
            floatingLabelText="Name"
            defaultValue="Jasper"
            style={styles.nameInput}
            inputStyle={styles.nameInput.inputStyle}
            floatingLabelFocusStyle={styles.nameInput.floatingLabelFocusStyle}
            floatingLabelStyle={styles.nameInput.floatingLabelStyle}
            underlineFocusStyle={styles.nameInput.underlineFocusStyle}
            fullWidth={true}
          />
        </Paper>
        <div style={entryGroupWrapperStyle}>
          <ProfileGroupComponent />
          <ProfileGroupComponent />
          <ProfileGroupComponent />
          <ProfileGroupComponent />
          <ProfileGroupComponent />
          <ProfileGroupComponent />
        </div>
      </div>
    );
  }
}

const CharacterProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterProfileComponent);

export default CharacterProfile;