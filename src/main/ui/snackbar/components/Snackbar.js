import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";

import * as s from "../selectors";
import { hideSnackbar } from "../actions";

const mapStateToProps = (state) => {
  return {
    open: s.isSnackbarOpen(state),
    message: s.getSnackbarMessage(state),
    autoHideDuration: s.getSnackbarAutoHideDuration(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestClose: () => {
      dispatch(hideSnackbar());
    }
  };
};

const PlotifySnackbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);

export default PlotifySnackbar;
