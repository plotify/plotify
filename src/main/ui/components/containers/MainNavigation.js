import React from "react";
import Navigation from "../presentational/Navigation";
import {changeSection} from "../../service/actions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  let disabled = false;
  if (!state.story) {
    disabled = true;
  }
  return {
    currentSection: state.currentSection,
    disabled: disabled
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeSection: (page) => {
      dispatch(changeSection(page));
    }
  }
};

const MainNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default MainNavigation;