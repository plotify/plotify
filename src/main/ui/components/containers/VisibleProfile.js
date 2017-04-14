import * as React from "react";
import Profile from "../presentational/Profile";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*
     onSave: (character) => {
     dispatch(saveCharacter(character))
     }
     */
  };
};

const VisibleProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default VisibleProfile;