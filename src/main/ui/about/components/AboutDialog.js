import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ContributorsDialog from "./ContributorsDialog";
import LicenseDialog from "./LicenseDialog";

import { isAboutDialogOpen, getAboutDialogCopyright } from "../selectors";
import { showContributorsDialog, showLicenseDialog, hideAboutDialog } from "../actions";

import { shell } from "electron";

import packageJson from "../../../package.json";

const imgStyle = {
  display: "block",
  float: "left"
};

const divStyle = {
  marginLeft: "152px"
};

const singleLineStyle = {
  marginTop: "1em"
};

const descriptionStyle = {
  marginTop: "2em",
  textAlign: "justify"
};

class AboutDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleOpenContributors = this.handleOpenContributors.bind(this);
    this.handleOpenLicense = this.handleOpenLicense.bind(this);
    this.handleOpenWebsite = this.handleOpenWebsite.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpenContributors() {
    this.props.onOpenContributors();
  }

  handleOpenLicense() {
    this.props.onOpenLicense();
  }

  handleOpenWebsite() {
    this.props.onOpenWebsite();
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
        label="Mitwirkende"
        onTouchTap={this.handleOpenContributors} />,
      <FlatButton
        label="Website"
        onTouchTap={this.handleOpenWebsite} />,
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
        <ContributorsDialog />
        <LicenseDialog />
        <img style={imgStyle} src="./resources/app-icons/128.png" />
        <div style={divStyle}>
          <h1>{packageJson.productName}</h1>
          <p style={singleLineStyle}>Version: {packageJson.version}</p>
          <p style={singleLineStyle}>{this.props.copyright}</p>
          <p style={descriptionStyle}>{packageJson.productDescription}</p>
        </div>
      </Dialog>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    open: isAboutDialogOpen(state),
    copyright: getAboutDialogCopyright(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenContributors: () => {
      dispatch(showContributorsDialog());
    },
    onOpenLicense: () => {
      dispatch(showLicenseDialog());
    },
    onOpenWebsite: () => {
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
