import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";

import * as s from "../selectors";
import { hideSnackbar } from "../actions";

const mapStateToProps = (state) => {
  return {
    open: s.isSnackbarOpen(state),
    message: s.getSnackbarMessage(state),
    autoHideDuration: s.getSnackbarAutoHideDuration(state),
    action: s.getSnackbarActionLabel(state),
    onActionTouchTap: s.getSnackbarActionCreator(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRequestClose: () => {
      dispatch(hideSnackbar());
    },
    onActionTouchTap: dispatch
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onActionTouchTap: () => {
      if (stateProps.onActionTouchTap) {
        dispatchProps.onActionTouchTap(stateProps.onActionTouchTap());
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
