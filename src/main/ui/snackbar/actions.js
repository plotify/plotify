import * as t from "./actionTypes";

export function showSnackbar(message) {
  return {
    type: t.SHOW_SNACKBAR,
    payload: { message }
  };
}

export function hideSnackbar() {
  return {
    type: t.HIDE_SNACKBAR,
    payload: {}
  };
}
