import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import * as s from "../selectors";
import { hideLicenseDialog } from "../actions";

const textStyle = {
  paddingTop: "1.5em",
  whiteSpace: "pre-wrap"
};

class LicenseDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.close();
  }

  render() {

    const actions = [
      <FlatButton
        label="Schließen"
        onTouchTap={this.handleClose} />
    ];

    let text;

    if (this.props.loading) {
      text = "Text wird geladen...";
    } else {
      text = this.props.text;
    }

    return (
      <Dialog
        title="Lizenz"
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}
        modal={false}
        autoScrollBodyContent={!this.props.loading}>
        <pre style={textStyle}>{text}</pre>
      </Dialog>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    open: s.isLicenseDialogOpen(state),
    loading: s.isLoadingLicenseText(state),
    text: s.getLicenseText(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch(hideLicenseDialog());
    }
  };
};

const ConnectedLicenseDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(LicenseDialog);

export default ConnectedLicenseDialog;
