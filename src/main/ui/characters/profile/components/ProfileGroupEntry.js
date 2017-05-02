import React, { Component } from "react";
import { TextField } from "material-ui";

const styles = {
  floatingLabelFocusStyle: {
    zIndex: 0,
  },
  floatingLabelStyle: {
    zIndex: 0,
  },
  underlineFocusStyle: {}
};

export default class ProfileGroupEntryComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TextField
        floatingLabelText={this.props.entry.title}
        value={this.props.entry.value}
        fullWidth={true}
        floatingLabelStyle={styles.floatingLabelStyle}
        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      />
    );
  }
}
