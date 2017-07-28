import React from "react";
import { connect } from "react-redux";

import * as s from "../selectors";
import { hideLicenseDialog } from "../actions";
import LicenseDialog from "../_presentation/LicenseDialog";

const mapStateToProps = (state) => {
  return {
    open:    s.isLicenseDialogOpen(state),
    loading: s.isLoadingLicenseText(state),
    text:    s.getLicenseText(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(hideLicenseDialog());
    },
  };
};

const ConnectedLicenseDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LicenseDialog);

export default ConnectedLicenseDialog;
