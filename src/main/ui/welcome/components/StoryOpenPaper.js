import React, { Component } from "react";
import { connect } from "react-redux";
import HoveringPaper from "./HoveringPaper";
import * as a from "../../story/actions";

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenStory: () => {
      dispatch(a.openStoryDialog());
    }
  };
};


const style = {
  wrapper: {
    left: "10%",
  }
};

class StoryOpenPaperComponent extends Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    return style;
  }

  render() {
    return(
      <HoveringPaper
        onTouchTap={this.props.handleOpenStory}
        background="resources/icons/material-open.png"
        title="Geschichte öffnen"
        wrapperStyle={this.getStyle().wrapper}
      />
    );
  }
}

const StoryOpenPaper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryOpenPaperComponent);

export default StoryOpenPaper;
