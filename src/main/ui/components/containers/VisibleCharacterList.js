import React from "react";
import {connect} from "react-redux";
import CharacterList from "../presentational/CharacterList";
import {createCharacter, deselectCharacter, findCharacters, selectCharacter, setFilter} from "../../service/actions";

const getEmptyMessage = (filter) => {
  let emptyMessage = "Erstelle deinen ersten Charakter, indem du auf das Plus drückst.";
  if (filter) {
    emptyMessage = "Keine Charaktere gefunden.";
  }
  return emptyMessage;
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    emptyMessage: getEmptyMessage(state.filter),
    filter: state.filter,
    selectedCharacterId: state.selected.id,
  };
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
      dispatch(setFilter(filter));
      dispatch(findCharacters(filter));
    },
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