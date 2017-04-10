import React from "react";
import {connect} from "react-redux";
import CharacterList from "../presentational/CharacterList";
import {deselectCharacter, findCharacters, selectCharacter, setFilter} from "../../service/actions";

const getEmptyMessage = (characters, filter) => {
  let emptyMessage = "Erstelle deinen ersten Charakter, indem du auf das Plus drückst.";
  if (filter && characters.length > 0) {
    emptyMessage = "Keine Charaktere gefunden.";
  }
  return emptyMessage;
};

const getVisibleCharacters = (characters, filter) => {
  return characters.filter((character) => {
    return character.name.toLowerCase().includes(filter.toLowerCase());
  });
};

const mapStateToProps = (state) => {
  console.log("CHAR LIST STATE ", state);
  return {
    characters: getVisibleCharacters(state.characters, state.filter),
    emptyMessage: getEmptyMessage(state.characters, state.filter),
    filter: state.filter,
    selectedCharacterId: state.selected.id,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      dispatch(selectCharacter(id));
    },
    onDeselect: () => {
      dispatch(deselectCharacter());
    },
    onSetFilter: (filter) => {
      dispatch(setFilter(filter))
    },
    onFindCharacters: () => {
      dispatch(findCharacters())
    }
  }
};

const VisibleCharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList);

export default VisibleCharacterList;