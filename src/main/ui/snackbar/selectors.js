export function isSnackbarOpen(state) {
  return state.snackbar.open === true;
}

export function getSnackbarMessage(state) {
  return state.snackbar.message;
}

export function getSnackbarAutoHideDuration(state) {
  return state.snackbar.autoHideDuration;
}
