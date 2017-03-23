import { connect } from "react-redux";

import Character from "../presentational/character";

const getSelectedCharacter = (characters, selected) => {
  return characters.find((character) => {
    return character.getId() === selected;
  });
};

const mapStateToProps = (state) => {
  return {
    character: getSelectedCharacter(state.characters, state.selected)
  };
};

const SelectedCharacter = connect(
  mapStateToProps
)(Character);

export default SelectedCharacter;
