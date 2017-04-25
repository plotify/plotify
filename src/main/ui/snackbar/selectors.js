export function isSnackbarOpen(state) {
  return state.snackbar.open === true;
}

export function getSnackbarMessage(state) {
  return state.snackbar.message;
}

export function getSnackbarAutoHideDuration(state) {
  return state.snackbar.autoHideDuration;
}

export function getSnackbarActionLabel(state) {
  return state.snackbar.actionLabel;
}

export function getSnackbarActionCreator(state) {
  return state.snackbar.actionCreator;
}
