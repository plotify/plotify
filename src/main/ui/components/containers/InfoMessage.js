import React from "react";
import {closeMessage} from "../../service/actions";
import {connect} from "react-redux";
import InfoSnackbar from "../presentational/InfoSnackbar";
import {shell} from "electron";

const mapStateToProps = (state) => {

  const defaultProps = {
    message: state.message.message,
    open: state.message.open,
    type: state.message.type,
  };

  const conditionalProps = {
    action: "öffnen",
    handleActionTouchTap: () => {
      console.log("OPENING", state.story);
      shell.showItemInFolder(state.story);
    }
  };
  let props = {};
  if (state.message.withAction) {
    props = Object.assign(conditionalProps, defaultProps);
  } else {
    props = defaultProps;
  }
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRequestClose: () => {
      dispatch(closeMessage());
    }
  };
};

const InfoMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoSnackbar);

export default InfoMessage;
