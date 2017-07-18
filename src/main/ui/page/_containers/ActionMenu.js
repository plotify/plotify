import React from "react";
import PropTypes from "prop-types";
import FloatingMenu from "../_presentation/FloatingMenu";
import { connect } from "react-redux";
import * as a from "../../story/actions";
import * as s from "../../story/selectors";
import * as aboutActions from "../../about/actions";

const mapStateToProps = (state) => {
  return {
    isStoryOpen: s.isStoryOpen(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStory:           () => dispatch(a.createStory()),
    onOpenStory:             () => dispatch(a.openStoryDialog()),
    onOpenStoryFileLocation: () => dispatch(a.openStoryFileLocation()),
    onOpenAboutDialog:       () => dispatch(aboutActions.showAboutDialog()),
  };
};


const ActionMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingMenu);

export default ActionMenu;

ActionMenu.propTypes = {
  anchorEl: PropTypes.string.isRequired,
};
