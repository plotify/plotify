import { connect } from "react-redux";
import * as a from "../actions";
import * as s from "../selectors";
import CharacterList from "../_presentation/CharacterList";

const mapStateToProps = (state) => {
  return {
    characters:              s.getCharactersInOrder(state),
    isThisCharacterSelected: (id) => id === s.getSelectedCharacterId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCharacter: (id) => dispatch(a.selectCharacter(id)),
  };
};

const VisibleCharacterList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterList);

export default VisibleCharacterList;
