import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatButton } from "../../mdl-components/Buttons";
import { Dialog } from "../../mdl-components/Dialog";
import { List, ListItem } from "../../mdl-components/List";
import { Avatar } from "../../mdl-components/List";

export default class ContributorsDialog extends PureComponent {

  render() {
    return (
      <Dialog
        className="plotify-contributors-dialog"
        title="Mitwirkende"
        open={this.props.open}
        onRequestClose={this.props.onClose}
        actions={[
          <FlatButton
            label="Schließen"
            onTouchTap={this.props.onClose}
            key="schließen"
          />,
        ]}
      >
        <List>
          {
            this.props.contributors.map((contributor, index) => {
              return (
                <ListItem
                  leftAvatar={
                    contributor.image ?
                      <Avatar src={contributor.image} /> :
                      <Avatar>{contributor.name.charAt(0)}</Avatar>
                  }
                  key={index}
                  caption={contributor.name}
                  handleSelect={() => this.props.openContributorUrl(contributor.url)}
                  secondaryActionIcon="launch"
                />
              );
            })
          }
        </List>
      </Dialog>
    );

  }
}

ContributorsDialog.propTypes = {
  open:               PropTypes.bool,
  openContributorUrl: PropTypes.func.isRequired,
  onClose:            PropTypes.func.isRequired,
};

ContributorsDialog.defaultProps = {
  open: false,
};
