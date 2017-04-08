import React from "react";
import {connect} from "react-redux";
import PresentationalPlotifyApp from "./PresentationalPlotifyApp";

// TODO
const mapStateToProps = (state) => {
  return {};
};

// TODO
const mapDispatchToProps = (dispatch) => {
  return {}
};


const PlotifyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentationalPlotifyApp);

export default PlotifyApp;
