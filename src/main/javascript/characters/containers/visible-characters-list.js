import { connect } from "react-redux";
import {
  addCharacter,
  addRandomCharacter,
  setFilter,
  selectCharacter,
  unselectCharacter
} from "../actions";
import CharactersList from "../presentational/characters-list";

const getVisibleCharacters = (characters, filter) => {
  return characters.filter((character) => {
    return character.name.toLowerCase().includes(filter.toLowerCase());
  });
};

const getEmptyMessage = (characters, filter) => {

  let emptyMessage = "Erstelle deinen ersten Charakter, indem du auf das Plus drückst.";

  if (filter && characters.length > 0) {
    emptyMessage = "Keine Charaktere gefunden.";
  }

  return emptyMessage;

};

const mapStateToProps = (state) => {
  return {
    characters: getVisibleCharacters(state.characters, state.filter),
    emptyMessage: getEmptyMessage(state.characters, state.filter),
    filter: state.filter,
    selectedCharacterId: state.selected.id,
    selectedCharacterIsNew: state.selected.newCharacter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCharacter: () => {
      dispatch(addCharacter());
    },
    onAddRandomCharacter: () => {
      dispatch(addRandomCharacter());
    },
    onSetFilter: (filter) => {
      dispatch(setFilter(filter));
    },
    onSelectCharacter: (id) => {
      dispatch(selectCharacter(id));
    },
    onUnselectCharacter: () => {
      dispatch(unselectCharacter());
    }
  };
};

const VisibleCharactersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersList);

export default VisibleCharactersList;
