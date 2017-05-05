import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "../selectors";
import * as a from "../actions";
import { Paper, TextField, CircularProgress } from "material-ui";
import ProfileGroup from "./ProfileGroup";
import { palette, spacing } from "../../../themes/PlotifyMainTheme";
import { white } from "material-ui/styles/colors";
import StatusTextField from "./StatusTextField";

const mapStateToProps = (state) => {
  return {
    characterId: s.getCharacterId(state),
    characterName: s.getCharacterName(state),
    isCharacterDeleted: s.isCharacterDeleted(state),
    groups: s.getGroupsInOrder(state),
    isLoading: s.isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCharacterNameChanged: (changedName) => dispatch(a.setCharacterName(changedName)),
    saveCharacterName: () => dispatch(a.saveCharacterName()),
  };
};

const styles = {
  wrapper: {
    height: "100%"
  },
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
  profileLoading: {
    position: "relative",
    left: "50%",
    marginLeft: -12,
    top: 50,
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
    this.state = {
      groupsAreReady: false,
    };
    this.handleCharacterChanged = this.handleCharacterChanged.bind(this);
    this.saveCharacterName = this.saveCharacterName.bind(this);
  }

  handleCharacterChanged(event) {
    this.props.handleCharacterNameChanged(event.target.value);
  }

  saveCharacterName() {
    this.props.saveCharacterName();
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Paper rounded={false}
               zDepth={2}
               style={styles.nameHeader}>
          <StatusTextField
            floatingLabelText="Name"
            value={this.props.characterName}
            style={styles.nameInput}
            inputStyle={styles.nameInput.inputStyle}
            floatingLabelFocusStyle={styles.nameInput.floatingLabelFocusStyle}
            floatingLabelStyle={styles.nameInput.floatingLabelStyle}
            underlineFocusStyle={styles.nameInput.underlineFocusStyle}
            fullWidth={true}
            onChange={this.handleCharacterChanged}
            onBlur={this.saveCharacterName}
          />
        </Paper>
        <div style={entryGroupWrapperStyle} className="scrollable">
          {
            (this.props.isLoading || !this.state.groupsAreReady) &&
            <CircularProgress size={24} thickness={2} style={styles.profileLoading}/>
          }
          <div style={this.state.groupsAreReady ? {} : { visibility: "hidden"}}>
          {
            this.props.groups.map((group) => {
              return (
                <ProfileGroup
                  key={group.id}
                  title={group.title}
                  entries={group.entries}
                  onReady={() => this.setState({groupsAreReady: true})}
                />
              );
            })
          }
          </div>

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
