import React from "react";
import { palette } from "../../../themes/PlotifyMainTheme";
import { Avatar, ListItem } from "material-ui";
import { fade } from "material-ui/utils/colorManipulator";
import * as a from "../actions";
import * as s from "../selectors";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    selectedCharacterId: s.getSelectedCharacterId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: (id) => {
      dispatch(a.selectCharacter(id));
    },
  };
};

const styles = {
  letterAvatar: {
    margin: 5
  },
  selected: {
    backgroundColor: palette.primary2Color,
    color: palette.alternateTextColor,
    letterAvatar: {
      margin: 5,
      backgroundColor: palette.primary1Color,
      color: palette.alternateTextColor
    },
  }
};

class CharacterListItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.selectedCharacterId !== this.props.characterId) {
      this.props.onSelectItem(this.props.characterId);
    }
  }

  render() {
    const isSelected = this.props.selectedCharacterId === this.props.characterId;
    return (
      <ListItem
        style={isSelected ? styles.selected : {}}
        onTouchTap={this.handleClick}
        hoverColor={fade(palette.primary2Color, 0.54)}
        primaryText={this.props.name || "Kein Name"}
        leftAvatar={
          <Avatar
            size={30}
            style={isSelected ? styles.selected.letterAvatar : styles.letterAvatar}>
            {this.props.name.charAt(0)}
          </Avatar>
        }
      />
    );
  }
}

const CharacterListItem = connect(
  mapStateToProps,
  mapDispatchToProps
) (CharacterListItemComponent);

export default CharacterListItem;
