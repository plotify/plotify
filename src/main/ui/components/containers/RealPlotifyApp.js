import React from "react";
import {connect} from "react-redux";
import PlotifyApp from "../presentational/PlotifyApp";

const mapStateToProps = (state) => {
  return {
    currentSection: state.currentSection,
    storyName: state.story,
    sectionIsLoading: state.sectionIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};


const RealPlotifyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlotifyApp);

export default RealPlotifyApp;

