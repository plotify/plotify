import React from "react";
import HoveringPaper from "./HoveringPaper";
import {connect} from "react-redux";
import * as s from "../../story/selectors";
import {openStoryDialog} from "../../story/actions";

const styles = {
  wrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
    background: "white",
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

class MixedWelcomeSection extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.paperWrapper}>
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

const mapStateToProps = (state) => {
  return {
    loading: s.isStoryLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateStory: () => {
      // dispatch(createStory());
    },
    handleOpenStory: () => {
      dispatch(openStoryDialog());
    }
  };
};

const WelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MixedWelcomeSection);

export default WelcomePage;
