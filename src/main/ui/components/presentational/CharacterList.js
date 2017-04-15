import React from "react";
import {List, ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import SearchBar from "./SearchBar";
import PlotifyMainTheme, {palette, spacing} from "../../themes/PlotifyMainTheme";

const styles = {
  wrapper: {
    zIndex: 3,
    position: "relative",
    height: "100%",
    backgroundColor: "white",
  },
  list : {
    overflowY: "auto",
    position: "relative",
    height: "95%",
  },
  characterItem: {
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
  },
  addButton: {
    marginLeft: "calc(50% - " + spacing.desktopToolbarHeight / 2 + "px)",
    position: "absolute",
    bottom: 26,
  }
};

export default class CharacterList extends React.Component {
  render() {
    return (
      <div id="CharacterList" style={styles.wrapper}>
        <SearchBar
          onSetFilter={(filter) => this.props.onSetFilter(filter)}
        />

        <List style={styles.list}>
          {
            this.props.characters.length === 0 &&
            <ListItem
              primaryText={this.props.emptyMessage}
              disabled={true}
              style={{fontFamily: PlotifyMainTheme.fontFamily, textAlign: "center"}}
            />
          }
          {
            this.props.characters.map((character) => {
              return (
                <CharacterListItem
                  name={character.name}
                  key={character.id}
                  selectedCharacter={
                    this.props.selectedCharacter !== null &&
                    this.props.selectedCharacter.id === character.id
                  }
                  onSelect={() => this.props.onSelect(character) }
                  onDeselect={() => this.props.onDeselect() }
                />
              );
            })
          }
        </List>
        <FloatingActionButton
          style={styles.addButton}
          onTouchTap={this.props.onAddCharacter}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}

class CharacterListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.ctrlKey && this.props.selectedCharacter) {
      this.props.onDeselect();
    } else {
      this.props.onSelect();
    }
  }

  render() {
    return (
      <ListItem
        style={this.props.selectedCharacter ? styles.characterItem.selected : {}}
        onTouchTap={this.handleClick}
        hoverColor={palette.accent2Color}
        primaryText={this.props.name || "Kein Name"}
        leftAvatar={
          <Avatar
            size={30}
            style={this.props.selectedCharacter ? styles.characterItem.selected.letterAvatar : styles.characterItem.letterAvatar}>
            {this.props.name.charAt(0)}
          </Avatar>
        }
      />
    );
  }
}

CharacterListItem.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  onDeselect: React.PropTypes.func.isRequired,
};
