import React from "react";
import {closeMessage} from "../../service/actions";
import {connect} from "react-redux";
import InfoSnackbar from "../presentational/InfoSnackbar";

const mapStateToProps = (state) => {
  return {
    message: state.message.message,
    open: state.message.open,
    type: state.message.type
  };
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
