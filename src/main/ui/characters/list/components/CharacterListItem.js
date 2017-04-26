import React from "react";
import palette from "../../../themes/PlotifyMainTheme";
import { Avatar, ListItem } from "material-ui";

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

export default class CharacterListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelectItem();
  }

  render() {
    return (
      <ListItem
        style={this.props.isSelected ? styles.selected : {}}
        onTouchTap={this.handleClick}
        hoverColor={palette.accent2Color}
        primaryText={this.props.name || "Kein Name"}
        leftAvatar={
          <Avatar
            size={30}
            style={this.props.isSelected ? styles.selected.letterAvatar : styles.letterAvatar}>
            {this.props.name.charAt(0)}
          </Avatar>
        }
      />
    );
  }
}