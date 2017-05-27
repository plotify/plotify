import React, { Component } from "react";
import * as s from "../selectors";
import { selectCharacter } from "../actions";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui";
import CharacterListItem from "./CharacterListItem";


const mapStateToProps = (state) => {
  return {
    characters: s.getCharactersInOrder(state),
    isLoading: s.isLoading(state),
    isLoadingFailed: s.isLoadingFailed(state),
    loadingError: s.getLoadingError(state),
    isCharacterSelected: s.isCharacterSelected(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const styles = {
  list: {
    height: "100%",
    overflowY: "auto",
  }
};

class CharacterListComponent extends Component {
  render() {
    return (
      <List style={styles.list}>
        {
          this.props.characters.map((character) => {
            return (
              <CharacterListItem
                name={character.name}
                key={character.id}
                characterId={character.id}
              />
            );
          })
        }
        <ListItem disabled={true} style={{ height: 8 * 8}}/>
      </List>
    );
  }
}

const CharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterListComponent);

export default CharacterList;
