import React from "react";
import { connect } from "react-redux";
import AboutDialog from "../_presentation/AboutDialog";

import { isAboutDialogOpen, getAboutDialogCopyright } from "../selectors";
import { showContributorsDialog, showLicenseDialog, hideAboutDialog } from "../actions";

import { shell } from "electron";
import packageJson from "../../../package.json";

const mapStateToProps = (state) => {
  return {
    open:      isAboutDialogOpen(state),
    copyright: getAboutDialogCopyright(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenContributors: () => {
      dispatch(showContributorsDialog());
    },
    onOpenLicense:      () => {
      dispatch(showLicenseDialog());
    },
    onOpenWebsite:      () => {
      shell.openExternal(packageJson.homepage);
    },
    onClose:            () => {
      dispatch(hideAboutDialog());
    },
  };
};

const ConnectedAboutDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutDialog);

export default ConnectedAboutDialog;
