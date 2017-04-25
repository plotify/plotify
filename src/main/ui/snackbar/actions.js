import * as t from "./actionTypes";

export function showSnackbar(message, actionLabel, actionCreator) {
  return {
    type: t.SHOW_SNACKBAR,
    payload: { message, actionLabel, actionCreator }
  };
}

export function hideSnackbar() {
  return {
    type: t.HIDE_SNACKBAR,
    payload: {}
  };
}
