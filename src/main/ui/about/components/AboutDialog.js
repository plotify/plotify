import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import LicenseDialog from "./LicenseDialog";

import { isAboutDialogOpen } from "../selectors";
import { showLicenseDialog, hideAboutDialog } from "../actions";

import { shell } from "electron";

import packageJson from "../../../package.json";

const imgStyle = {
  display: "block",
  float: "left"
};

const divStyle = {
  marginLeft: "152px"
};

const versionStyle = {
  marginTop: "1em"
};

const descriptionStyle = {
  marginTop: "1em",
  textAlign: "justify"
};

class AboutDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleOpenLicense = this.handleOpenLicense.bind(this);
    this.handleOpenHomepage = this.handleOpenHomepage.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpenLicense() {
    this.props.onOpenLicense();
  }

  handleOpenHomepage() {
    this.props.onOpenHomepage();
  }

  handleClose() {
    this.props.close();
  }

  render() {

    const actions = [
      <FlatButton
        label="Lizenz"
        onTouchTap={this.handleOpenLicense} />,
      <FlatButton
        label="Homepage"
        onTouchTap={this.handleOpenHomepage} />,
      <FlatButton
        label="Schließen"
        primary={true}
        onTouchTap={this.handleClose} />
    ];

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}
        modal={false}>
        <LicenseDialog />
        <img style={imgStyle} src="./resources/app-icons/128.png" />
        <div style={divStyle}>
          <h1>{packageJson.productName}</h1>
          <p style={versionStyle}>Version: {packageJson.version}</p>
          <p style={descriptionStyle}>{packageJson.productDescription}</p>
        </div>
      </Dialog>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    open: isAboutDialogOpen(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenLicense: () => {
      dispatch(showLicenseDialog());
    },
    onOpenHomepage: () => {
      shell.openExternal(packageJson.homepage);
    },
    close: () => {
      dispatch(hideAboutDialog());
    }
  };
};

const ConnectedAboutDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutDialog);

export default ConnectedAboutDialog;
