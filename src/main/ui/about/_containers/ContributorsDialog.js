import React from "react";
import { connect } from "react-redux";

import { shell } from "electron";

import * as s from "../selectors";
import { hideContributorsDialog } from "../actions";
import ContributorsDialog from "../_presentation/ContributorsDialog";

const contributors = [
  {
    name: "Sebastian Schmidt",
    url: "https://github.com/SebastianSchmidt",
    image: "./resources/contributors/sebastian-schmidt.jpg"
  },
  {
    name: "Jasper Meyer",
    url: "https://github.com/itsJASPERr",
    image: "./resources/contributors/jasper-meyer.jpg"
  },
  {
    name: "Rebecca Rademacher",
    url: "https://github.com/RebeccaRademacher",
    image: null
  },
  {
    name: "Gesa Müller",
    url: "https://github.com/GesaMueller",
    image: null
  }
];

const mapStateToProps = (state) => {
  return {
    open: s.isContributorsDialogOpen(state),
    contributors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => {
      dispatch(hideContributorsDialog());
    },
    openContributorUrl: (url) => {
      shell.openExternal(url);
    }
  };
};

const ConnectedContributorsDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributorsDialog);

export default ConnectedContributorsDialog;
