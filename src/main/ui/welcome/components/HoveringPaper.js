import React from "react";
import Paper from "material-ui/Paper";
import { spacing } from "../../themes/PlotifyMainTheme";
import RefreshIndicator from "material-ui/RefreshIndicator";

const style = {
  noRadius: { borderRadius: 0 },
};

export default class HoveringPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 2,
      isLoading: this.props.isLoading,
      isHovered: true,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isLoading: true,
    });
    this.props.onTouchTap();
  }

  handleMouseOver() {
    this.setState({
      height: 5,
      // isHovered: true,
    });
  }

  handleMouseOut() {
    this.setState({
      height: 2,
      isLoading: false,
      // isHovered: false,
    });
  }

  stylesWrapper() {
    const styles = {
      position: "relative",
      float: "left",
      // width: 350,
      margin: "5%",
      minWidth: 220,
      width: "25%",
      minHeight: 220,
      height: "25vw",
    };
    return Object.assign({}, styles, this.props.wrapperStyle);
  }

  stylesPaper() {
    const isHovered = this.state.isHovered;
    const size = isHovered ? "100%" : "70%";
    const styles = {
      position: "absolute",
      backgroundImage: "url(" + this.props.background + ")",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      left: isHovered ? 0 : "15%",
      bottom: 0,
      width: size,
      height: size,
      cursor: "pointer",
      opacity: this.state.isLoading ? 0.7 : 1,
    };
    return Object.assign({}, styles, this.props.paperStyle);
  }

  stylesLabel() {
    const styles = {
      position: "absolute",
      height: "auto",
      width: "100%",
      padding: spacing.desktopGutterMini,
      fontSize: "150%",
      bottom: -50,
      overflow: "hidden",
      textAlign: "center",
    };
    return Object.assign({}, styles, this.props.labelStyle);
  }

  render() {
    return (
      <div style={this.stylesWrapper()}>
        {
          this.state.isLoading &&
          <RefreshIndicator
            left={85}
            top={85}
            size={50}
            status="loading"/>
        }
        <div
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          >
          <Paper
            style={this.stylesPaper()}
            zDepth={this.state.height}
            >
          </Paper>
          <Paper zDepth={this.state.height} style={this.stylesLabel()}>
            {this.props.title}
          </Paper>
        </div>
      </div>

    );
  }
}
