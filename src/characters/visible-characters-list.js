import { connect } from "react-redux";

import { addCharacter, addRandomCharacter, setFilter } from "./actions";
import CharactersList from "./characters-list";

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
    filter: state.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCharacter: (name) => {
      dispatch(addCharacter(name));
    },
    onAddRandomCharacter: () => {
      dispatch(addRandomCharacter());
    },
    onSetFilter: (filter) => {
      dispatch(setFilter(filter));
    }
  };
};

const VisibleCharactersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersList);

export default VisibleCharactersList;
