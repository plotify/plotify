import { connect } from "react-redux";
import { changeCharacterName } from "../actions";
import Character from "../presentational/character";

const getSelectedCharacter = (characters, selected) => {
  return characters.find((character) => {
    return character.id === selected.id;
  });
};

const mapStateToProps = (state) => {
  return {
    character: getSelectedCharacter(state.characters, state.selected)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCharacterNameChanged: (id, name) => {
      dispatch(changeCharacterName(id, name));
    }
  };
};

const SelectedCharacter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);

export default SelectedCharacter;
