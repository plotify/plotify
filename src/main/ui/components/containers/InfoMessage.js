import React from "react";
import {closeMessage, openStoryFileLocation} from "../../service/actions";
import {connect} from "react-redux";
import InfoSnackbar from "../presentational/InfoSnackbar";
import {shell} from "electron";

const mapStateToProps = (state) => {
  return {
    message: state.message.message,
    open: state.message.open,
    type: state.message.type,
    storyOpen: state.story !== "",
    action: "Speicherort öffnen",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenStoryLocation: () => {
      dispatch(openStoryFileLocation());
    },
    onCloseMessage: () => {
      dispatch(closeMessage());
    }
  };
};

const InfoMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoSnackbar);

export default InfoMessage;
