import React from "react";
import Paper from "material-ui/Paper";
import PlotifyMainTheme, { spacing } from "../../themes/PlotifyMainTheme";

const styles = {
  float: "left",
  width: 350,
  margin: 50,
  cursor: "pointer",
  fontFamily: PlotifyMainTheme.fontFamily,
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
        style={styles}
        zDepth={this.state.height}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        <img src={this.props.background} style={{ width: "100%" }}/>
        <div style={{ height: "auto", width: "100%", padding: spacing.desktopGutterMini, fontSize: spacing.iconSize }}>
          {this.props.title}
        </div>
      </Paper>
    );
  }
}
