import React from "react";
import {List, ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import SearchBar from "./SearchBar";
import {palette, spacing} from "../../themes/PlotifyMainTheme";

const styles = {
  list: {
    zIndex: 3,
    position: "relative",
    height: "100%",
    backgroundColor: "white",
  },
  characterItem: {
    letterAvatar: {
      margin: 5
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
    console.log(this.props.characters);
    return (
      <div id="CharacterList" style={styles.list}>
        <SearchBar
          onSetFilter={this.props.onSetFilter}
        />
        {
          this.props.characters.size === 0 && this.props.emptyMessage
        }
        <List>
          {
            this.props.characters.map((character) => {
              return (
                <CharacterListItem
                  name={character.name}
                  key={character.id}
                  selectedCharacter={this.props.selectedCharacterId === character.id}
                  onSelect={() => this.props.onSelect(character.id) }
                  onDeselect={() => this.props.onDeselect() }
                />
              );
            })
          }
        </List>
        <FloatingActionButton style={styles.addButton}>
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
        onTouchTap={this.handleClick}
        hoverColor={palette.accent2Color}
        primaryText={this.props.name}
        leftAvatar={
          <Avatar
            size={30}
            style={styles.characterItem.letterAvatar}>
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