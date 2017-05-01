import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import { isAboutDialogOpen } from "../selectors";
import { hideAboutDialog } from "../actions";

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
    this.handleClose = this.handleClose.bind(this);
  }

  openHomepage() {
    shell.openExternal(packageJson.homepage);
  }

  handleClose() {
    this.props.close();
  }

  render() {

    const actions = [
      <FlatButton
        label="Homepage"
        onTouchTap={this.openHomepage}
      />,
      <FlatButton
        label="Schließen"
        onTouchTap={this.handleClose} />
    ];

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}
        modal={false}>
        <img style={imgStyle} src="./resources/app-icons/128.png" />
        <div style={divStyle}>
          <h1>{packageJson.productName}</h1>
          <p style={versionStyle}>{packageJson.version}</p>
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
