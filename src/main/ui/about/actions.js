import * as t from "./actionTypes";
import fs from "fs-promise";
import firstline from "firstline";
import path from "path";
import { remote } from "electron";
import isDev from "electron-is-dev";

export function showAboutDialog() {
  return (dispatch) => {
    return Promise.resolve()
      .then(() => firstline(getLicenseFile()))
      .then(copyright => dispatch(showAboutDialogWithCopyright(copyright)))
      .catch(error => dispatch(showAboutDialogWithCopyright(null)));
  };
}

export function hideAboutDialog() {
  return {
    type: t.HIDE_ABOUT_DIALOG,
    payload: {}
  };
}

export function showLicenseDialog() {
  return (dispatch) => {
    const licenseFileEncoding = "utf-8";
    return Promise.resolve()
      .then(() => dispatch(showLicenseDialogRequest()))
      .then(() => fs.readFile(getLicenseFile(), { encoding: licenseFileEncoding }))
      .then(text => dispatch(showLicenseDialogSuccessful(text)))
      .catch(error => dispatch(showLicenseDialogFailed(error)));
  };
}

export function hideLicenseDialog() {
  return {
    type: t.HIDE_LICENSE_DIALOG,
    payload: {}
  };
}

export function showContributorsDialog() {
  return {
    type: t.SHOW_CONTRIBUTORS_DIALOG,
    payload: {}
  };
}

export function hideContributorsDialog() {
  return {
    type: t.HIDE_CONTRIBUTORS_DIALOG,
    payload: {}
  };
}

function showAboutDialogWithCopyright(copyright) {
  return {
    type: t.SHOW_ABOUT_DIALOG,
    payload: { copyright }
  };
}

function showLicenseDialogRequest() {
  return {
    type: t.SHOW_LICENSE_DIALOG_REQUEST,
    payload: {}
  };
}

function showLicenseDialogSuccessful(text) {
  return {
    type: t.SHOW_LICENSE_DIALOG_SUCCESSFUL,
    payload: { text }
  };
}

function showLicenseDialogFailed(error) {
  return {
    type: t.SHOW_LICENSE_DIALOG_FAILED,
    payload: { error }
  };
}

function getLicenseFile() {
  let licenseFile = path.join(remote.app.getAppPath(), "./LICENSE");
  if (isDev) {
    licenseFile = "./LICENSE";
  }
  return licenseFile;
}
