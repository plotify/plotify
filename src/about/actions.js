import * as t from './actionTypes';

export function openAboutDialog() {
  return {
    type: t.OPEN_ABOUT_DIALOG,
    payload: {}
  };
}

export function closeAboutDialog() {
  return {
    type: t.CLOSE_ABOUT_DIALOG,
    payload: {}
  };
}

export function openContributorsDialog() {
  return {
    type: t.OPEN_CONTRIBUTORS_DIALOG,
    payload: {}
  };
}

export function closeContributorsDialog() {
  return {
    type: t.CLOSE_CONTRIBUTORS_DIALOG,
    payload: {}
  };
}
