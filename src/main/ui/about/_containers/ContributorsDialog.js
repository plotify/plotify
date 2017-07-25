import React from "react";
import { connect } from "react-redux";

import Dialog from "material-ui/Dialog";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import FlatButton from "material-ui/FlatButton";

import { shell } from "electron";

import * as s from "../selectors";
import { hideContributorsDialog } from "../actions";

const contributors = [
  {
    name: "Sebastian Schmidt",
    url: "https://github.com/SebastianSchmidt",
    image: "./resources/contributors/sebastian-schmidt.jpg"
  },
  {
    name: "Jasper Meyer",
    url: "https://github.com/itsJASPERr",
    image: null
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

class ContributorsDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenContributorUrl = this.handleOpenContributorUrl.bind(this);
  }

  handleClose() {
    this.props.close();
  }

  handleOpenContributorUrl(url) {
    this.props.openContributorUrl(url);
  }

  render() {

    const actions = [
      <FlatButton
        label="Schließen"
        onTouchTap={this.handleClose} />
    ];

    return (
      <Dialog
        title="Mitwirkende"
        open={this.props.open}
        onRequestClose={this.handleClose}
        actions={actions}
        modal={false}>
        <List>
          {
            this.props.contributors.map((contributor, index) => {
              return (
                <ListItem
                  key={index}
                  primaryText={contributor.name}
                  leftAvatar={contributor.image ? <Avatar src={contributor.image} /> : <Avatar>{contributor.name.charAt(0)}</Avatar>}
                  onTouchTap={() => this.handleOpenContributorUrl(contributor.url)} />
              );
            })
          }
        </List>
      </Dialog>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    open: s.isContributorsDialogOpen(state),
    contributors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
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
