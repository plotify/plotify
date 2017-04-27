import React, { Component } from "react";
import HoveringPaper from "./HoveringPaper";
import { connect } from "react-redux";
import * as s from "../../story/selectors";
import { createStory, openStoryDialog } from "../../story/actions";

const mapStateToProps = (state) => {
  return {
    isLoading: s.isStoryLoading(state) ||
    s.isStoryClosing(state) ||
    s.isStoryCreating(state),
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
    textAlign: "center",
    align: "center",
  },
  paperWrapper: {
    position: "absolute",
    width: "100%",
    left: "50%",
    marginLeft: -450,
  },
};

class WelcomePageComponent extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.paperWrapper}>
          {this.props.isLoading && "loading..."}
          <HoveringPaper
            onTouchTap={this.props.handleCreateStory}
            background="resources/icons/material-new.png"
            title="Neue Geschichte erstellen"/>
          <HoveringPaper
            onTouchTap={this.props.handleOpenStory}
            background="resources/icons/material-open.png"
            title="Geschichte öffnen"/>
        </div>
      </div>
    );
  }
}

const WelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePageComponent);

export default WelcomePage;
