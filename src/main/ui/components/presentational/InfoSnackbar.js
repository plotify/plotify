import React from "react";
import Snackbar from "material-ui/Snackbar";

export default class InfoSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 5000,
    };
  }

  render() {

    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.state.autoHideDuration}
        onRequestClose={this.props.onCloseMessage}
        onActionTouchTap={this.props.onOpenStoryLocation}
        action={this.props.showAction && this.props.action}
      />
    );
  }
}
