import React, { Component } from "react";
import { green500 } from "material-ui/styles/colors";
import  ActionDone  from "material-ui/svg-icons/action/done";

export default class FadingSuccessIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActionDone color={green500}/>
    );
  }
}