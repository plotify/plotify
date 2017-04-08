import React from "react";
import {List, ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import SearchBar from "../search/SearchBar";
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
    return (
      <div id="CharacterList" style={styles.list}>
        <SearchBar />
        <List>
          {
            this.props.characters.map((character) => {
              return (
                <CharacterListItem
                  name={character.name}
                  key={character.id}
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

  }

  render() {
    return (
      <ListItem
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
