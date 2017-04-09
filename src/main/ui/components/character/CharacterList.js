import React from "react";
import {connect} from "react-redux";
import PresentationalCharacterList from "../presentational/CharacterList";
import {deselectCharacter, selectCharacter} from "../../service/actions";

const mapStateToProps = (state) => {
  console.log("CHAR LIST STATE ", state);
  return {
    // characters: getVisibleCharacters(state.characters, state.filter),
    // emptyMessage: getEmptyMessage(state.characters, state.filter),
    characters: state.characters,
    filter: state.filter,
    selectedCharacterId: state.selected.id,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id) => {
      // dispatch(selectCharacter(id));
    },
    onDeselect: () => {
      dispatch(deselectCharacter());
    }
  }
};

const CharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
) (PresentationalCharacterList);

export default CharacterList;