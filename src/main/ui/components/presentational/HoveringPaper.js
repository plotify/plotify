import React from "react";
import Paper from "material-ui/Paper";

const hoveringPaperStyles = {
  position: "relative",
  height: 200,
  width: "80%",
  left: "50%",
  marginLeft: "-42%",
  marginTop: 50,
  cursor: "pointer",
};

export default class HoveringPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 1,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      height: 3
    });
  }

  handleMouseOut() {
    this.setState({
      height: 1
    });
  }

  render() {
    return (
      <Paper
        onClick={this.props.onTouchTap}
        style={hoveringPaperStyles}
        zDepth={this.state.height}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {this.props.children}
      </Paper>
    );
  }
}
;
