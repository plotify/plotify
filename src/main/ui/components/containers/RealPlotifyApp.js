import React from "react";
import {connect} from "react-redux";
import PlotifyApp from "../presentational/PlotifyApp";
import {
  canRedoCharacterChange, canUndoCharacterChange, redoCharacterChange,
  undoCharacterChange
} from "../../service/actions";

const mapStateToProps = (state) => {
  return {
    currentSection: state.currentSection,
    storyName: state.story,
    sectionIsLoading: state.sectionIsLoading,
    savingType: state.communications.savingType,
    canUndo: state.history.undo.isAvailable,
    canRedo: state.history.redo.isAvailable,
    undo: state.history.undo.changes,
    characterId: state.selectedCharacter.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndoCharacterChange: (id) => {
      dispatch(undoCharacterChange(id));
      dispatch(canUndoCharacterChange(id));
      dispatch(canRedoCharacterChange(id));
    },
    onRedoCharacterChange: (id) => {
      dispatch(redoCharacterChange(id));
      dispatch(canUndoCharacterChange(id));
      dispatch(canRedoCharacterChange(id));
    }
  };
};

const RealPlotifyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotifyApp);

export default RealPlotifyApp;
