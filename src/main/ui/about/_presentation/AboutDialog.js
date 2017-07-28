import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dialog } from "../../mdl-components/Dialog";
import { FlatButton , RaisedButton} from "../../mdl-components/Buttons";
import ContributorsDialog from "../_containers/ContributorsDialog";
import LicenseDialog from "../_containers/LicenseDialog";
import packageJson from "../../../package.json";

export default class AboutDialog extends PureComponent {
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
    this.props.onClose();
  }

  render() {

    const actions = [
      <FlatButton
        label="Lizenz"
        key="Lizenz"
        onTouchTap={this.handleOpenLicense} />,
      <FlatButton
        label="Mitwirkende"
        key="Mitwirkende"
        onTouchTap={this.handleOpenContributors} />,
      <FlatButton
        label="Website"
        key="Website"
        onTouchTap={this.handleOpenWebsite} />,
      <FlatButton
        label="Schließen"
        key="Schließen"
        primary={true}
        onTouchTap={this.handleClose} />,
    ];

    return (
      <Dialog
        className="plotify-about-dialog"
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}>
        <img src="./resources/app-icons/128.png" />
        <div className="content">
          <h2>{packageJson.productName}</h2>
          <p>Version: {packageJson.version}</p>
          <p>{this.props.copyright}</p>
          <p className="description">{packageJson.productDescription}</p>
        </div>
        <ContributorsDialog />
        <LicenseDialog />
      </Dialog>
    );
  }
}

AboutDialog.propTypes = {
  open:               PropTypes.bool,
  onClose:            PropTypes.func.isRequired,
  onOpenWebsite:      PropTypes.func.isRequired,
  onOpenLicense:      PropTypes.func.isRequired,
  onOpenContributors: PropTypes.func.isRequired,
};

AboutDialog.defaultProps = {
  open: false,
};
