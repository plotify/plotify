import { connect } from "react-redux";
import Snackbar from "../../mdl-components/Snackbar";

import * as s from "../selectors";
import { hideSnackbar } from "../actions";

const mapStateToProps = (state) => {
  return {
    open: s.isSnackbarOpen(state),
    message: s.getSnackbarMessage(state),
    autoHideDuration: s.getSnackbarAutoHideDuration(state),
    actionLabel: s.getSnackbarActionLabel(state),
    action: s.getSnackbarActionCreator(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRequestClose: () => {
      dispatch(hideSnackbar());
    },
    action: dispatch
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    action: () => {
      if (stateProps.action) {
        dispatchProps.action(stateProps.action());
      }
    }
  });
};

const PlotifySnackbar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Snackbar);

export default PlotifySnackbar;
