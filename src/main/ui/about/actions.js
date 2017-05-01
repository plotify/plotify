import * as t from "./actionTypes";

export function showAboutDialog() {
  return {
    type: t.SHOW_ABOUT_DIALOG,
    payload: {}
  };
}

export function hideAboutDialog() {
  return {
    type: t.HIDE_ABOUT_DIALOG,
    payload: {}
  };
}
