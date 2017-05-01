import * as t from "./actionTypes";

const initialState = {
  open: false,
  openLicense: false,
  loadingLicenseText: false,
  licenseText: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.SHOW_ABOUT_DIALOG:
      return Object.assign({}, state, {
        open: true
      });

    case t.HIDE_ABOUT_DIALOG:
      return Object.assign({}, state, {
        open: false
      });

    case t.SHOW_LICENSE_DIALOG_REQUEST:
      return Object.assign({}, state, {
        openLicense: true,
        loadingLicenseText: true
      });

    case t.SHOW_LICENSE_DIALOG_SUCCESSFUL:
      return Object.assign({}, state, {
        loadingLicenseText: false,
        licenseText: action.payload.text
      });

    case t.SHOW_LICENSE_DIALOG_FAILED:
      return Object.assign({}, state, {
        loadingLicenseText: false,
        licenseText: action.payload.error.toString()
      });

    case t.HIDE_LICENSE_DIALOG:
      return Object.assign({}, state, {
        openLicense: false,
        loadingLicenseText: false,
        licenseText: null
      });

    default:
      return state;

  }
}
