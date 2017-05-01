import * as t from "./actionTypes";
import fs from "fs-promise";
import path from "path";
import { remote } from "electron";
import isDev from "electron-is-dev";

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

export function showLicenseDialog() {
  return (dispatch) => {

    const licenseFileEncoding = "utf-8";
    let licenseFilePath = path.join(remote.app.getAppPath(), "./LICENSE");

    if (isDev) {
      licenseFilePath = "./LICENSE";
    }

    return Promise.resolve()
      .then(() => dispatch(showLicenseDialogRequest()))
      .then(() => fs.readFile(licenseFilePath, { encoding: licenseFileEncoding }))
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
