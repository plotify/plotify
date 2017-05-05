import React, { Component } from "react";
import { green500 } from "material-ui/styles/colors";
import  ActionDone  from "material-ui/svg-icons/action/done";

export default class FadingSuccessIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeoutTime: 5000,
    };
  }

  componentDidMount() {
    const timeoutId = setTimeout(() => {
      this.props.handleRequestClose();
    }, this.state.fadeoutTime);
  }

  render() {
    return (
      <ActionDone color={green500} />
    );
  }
}
