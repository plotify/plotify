import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as s from "../selectors";
import * as a from "../actions";
import snackbar from '../../../snackbar'
import ProfileName from "../_presentation/ProfileName";

const mapStateToProps = (state) => {
  return {
    name:            s.getCharacterName(state),
    hasValueChanged: s.hasCharacterNameChanged(state),
    isSaving:        s.isSaving(state),
    isSavingFailed:  s.isSavingFailed(state),
    savingError:     s.getSavingError(state),
    canUndo:         s.canUndo(state),
    canRedo:         s.canRedo(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCharacterNameChanged: (changedName) => dispatch(a.setCharacterName(changedName)),
    saveCharacterName:          () => dispatch(a.saveCharacterName()),
    handleUndo:                 () => dispatch(snackbar.actions.showSnackbar("Diese Funktion steht leider noch nicht zur Verfügung")),
    handleRedo:                 () => dispatch(snackbar.actions.showSnackbar("Diese Funktion steht leider noch nicht zur Verfügung")),
  };
};

const CharacterName = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileName);

export default CharacterName;

CharacterName.propTypes = {
  id: PropTypes.string.isRequired,
};
