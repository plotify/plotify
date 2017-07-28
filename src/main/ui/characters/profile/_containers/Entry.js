import PropTypes from "prop-types";
import { connect }from "react-redux";
import * as a from "../actions";
import * as s from "../selectors";
import SavingTextField from "../_presentation/SavingTextField";

const makeMapStateToProps = () => {
  const hasEntryValueChanged = s.makeHasEntryValueChanged();
  const getEntryValue = s.makeGetEntryValue();
  const isEntrySaving = s.makeIsEntrySaving();
  const isEntrySavingFailed = s.makeIsEntrySavingFailed();
  const getEntrySavingError = s.makeGetEntrySavingError();

  const mapStateToProps = (state, props) => {
    return {
      value:           getEntryValue(state, props),
      hasValueChanged: hasEntryValueChanged(state, props),
      isSaving:        isEntrySaving(state, props),
      isSavingFailed:  isEntrySavingFailed(state, props),
      savingError:     getEntrySavingError(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave:   (id) => dispatch(a.saveEntryValue(id)),
    onChange: (id, changedValue) => dispatch(a.setEntryValue(id, changedValue)),
  }
};

const Entry = connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(SavingTextField);

export default Entry;

Entry.propTypes = {
  entryId: PropTypes.string.isRequired,
  id:      PropTypes.string.isRequired,
  title:   PropTypes.string.isRequired,
};
