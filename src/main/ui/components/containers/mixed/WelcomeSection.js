import React from "react";
import HoveringPaper from "../../presentational/HoveringPaper";
import {connect} from "react-redux";
import {createStory, openStoryDialog} from "../../../service/actions";
import PlotifyMainTheme, {spacing} from "../../../themes/PlotifyMainTheme";

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
  icons: {
    height: 60,
    width: 60,
  },
  newStory: {},
  openStory: {}

};

class MixedWelcomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.createStory = this.createStory.bind(this);
  }

  createStory() {
    this.setState({
      loading: true
    });
    this.props.onCreateStory();
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.paperWrapper}>
          <HoveringPaper
            onTouchTap={this.createStory}
            background="resources/icons/material-new.png"
            title="Neue Geschichte erstellen"/>
          <HoveringPaper
            onTouchTap={this.props.onOpenStory}
            background="resources/icons/material-open.png"
            title="Geschichte öffnen"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStory: () => {
      dispatch(createStory());
    },
    onOpenStory: () => {
      dispatch(openStoryDialog());
    }
  };
};

const WelcomeSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MixedWelcomeSection);

export default WelcomeSection;
