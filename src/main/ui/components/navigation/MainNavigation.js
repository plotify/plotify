import React from "react";
import Navigation from "./PresentationalMainNavigation";
import {changePage} from "../../service/actions";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePage: (page) => {
      dispatch(changePage(page));
    }
  }
};

const MainNavigation = connect(
  mapStateToProps,
  mapDispatchToProps
) (Navigation);

export default MainNavigation;