import React from "react";
import {connect} from "react-redux";
import PlotifyApp from "../presentational/PlotifyApp";
import {canUndoCharacterChange, undoCharacterChange} from "../../service/actions";

const mapStateToProps = (state) => {
  return {
    currentSection: state.currentSection,
    storyName: state.story,
    sectionIsLoading: state.sectionIsLoading,
    savingType: state.communications.savingType,
    canUndo: state.history.undo.isAvailable,
    undo: state.history.undo.changes,
    characterId: state.selectedCharacter.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndoCharacterChange: (id) => {
      dispatch(undoCharacterChange(id));
    }
  };
};

const RealPlotifyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotifyApp);

export default RealPlotifyApp;
