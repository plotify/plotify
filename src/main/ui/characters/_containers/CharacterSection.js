import React, { Component } from "react";
import { connect } from "react-redux";
import creation from "../creation";
import * as s from "../profile/selectors";
import CharacterPage from "../_presentation/CharacterPage";

const mapStateToProps = (state) => {
  return {
    visible: s.isVisible(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCharacter: () => dispatch(creation.actions.createCharacter()),
  };
};

const CharacterSection = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterPage);

export default CharacterSection;
