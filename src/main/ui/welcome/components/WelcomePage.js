import React, { Component } from "react";
import HoveringPaper from "./HoveringPaper";
import { connect } from "react-redux";
import * as s from "../../story/selectors";
import { createStory, openStoryDialog } from "../../story/actions";

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
      dispatch(createStory());
    },
    handleOpenStory: () => {
      dispatch(openStoryDialog());
    }
  };
};

const styles = {
  wrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
  },
};

class WelcomePageComponent extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <HoveringPaper
          isLoading={this.props.isStoryCreating}
          onTouchTap={this.props.handleCreateStory}
          background="resources/icons/material-new.png"
          title="Neue Geschichte"
          wrapperStyle={{ left: "10%" }}
        />
        <HoveringPaper
          onTouchTap={this.props.handleOpenStory}
          background="resources/icons/material-open.png"
          title="Geschichte öffnen"
          wrapperStyle={{ left: "10%" }}
        />
      </div>
    );
  }
}

const WelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePageComponent);

export default WelcomePage;
