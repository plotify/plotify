import React from "react";
import {connect} from "react-redux";
import CharacterList from "../presentational/CharacterList";
import {createCharacter} from "../../service/actions";

const getEmptyMessage = (filter) => {
  let emptyMessage = "Erstelle deinen ersten Charakter, indem du auf das Plus drückst.";
  if (filter) {
    emptyMessage = "Keine Charaktere gefunden.";
  }
  return emptyMessage;
};

const getCharacters = (characters, selectedCharacter) => {
  if (selectedCharacter === undefined) {
    return characters;
  }
  return characters.map((character) => {
    if (character.id === selectedCharacter.id) {
      return Object.assign({}, character, selectedCharacter);
    }
    return character;
  });
};

const mapStateToProps = (state) => {
  return {
    characters: getCharacters(state.characters, state.selectedCharacter),
    emptyMessage: getEmptyMessage(state.filter),
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCharacter: () => {
      dispatch(createCharacter());
    },
  };
};

const VisibleCharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList);

export default VisibleCharacterList;