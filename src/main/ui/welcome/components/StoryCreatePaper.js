import React, { Component } from "react";
import { connect } from "react-redux";
import * as s from "../../story/selectors";
import * as a from "../../story/actions";
import HoveringPaper from "./HoveringPaper";

const mapStateToProps = (state) => {
  return {
    isLoading: s.isStoryLoading(state),
    isStoryClosing: s.isStoryClosing(state),
    isStoryCreating: s.isStoryCreating(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateStory: () => {
      dispatch(a.createStory());
    },
  };
};

const style = {
  wrapper: {
    left: "10%",
  }
};

class StoryCreatePaperComponent extends Component {
  constructor(props) {
    super(props);
  }

  getStyle() {
    return style;
  }

  render() {
    return(
      <HoveringPaper
        isLoading={this.props.isStoryCreating}
        onTouchTap={this.props.handleCreateStory}
        background="resources/icons/material-new.png"
        title="Neue Geschichte"
        wrapperStyle={this.getStyle().wrapper}
      />
    );
  }

}

const StoryCreatePaper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryCreatePaperComponent);

export default StoryCreatePaper;
