import React from "react";
import Snackbar from "material-ui/Snackbar";

export default class InfoSnackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 5000,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {

    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.state.autoHideDuration}
        onRequestClose={this.props.handleRequestClose}
        onActionTouchTap={this.props.handleActionTouchTap}
        action={this.props.action}
      />
    );
  }
}
