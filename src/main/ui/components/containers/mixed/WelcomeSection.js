import React from "react";
import FolderOpen from "material-ui/svg-icons/file/folder-open";
import AvNewReleases from "material-ui/svg-icons/av/new-releases";
import HoveringPaper from "../../presentational/HoveringPaper";
import {connect} from "react-redux";
import {createStory, openStory} from "../../../service/actions";

const styles = {
  wrapper: {
    float: "left",
    height: "100%",
    maxWidth: "95%",
    minWidth: "400",
  },
  paperWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
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
            onTouchTap={this.createStory}>
            <AvNewReleases style={styles.icons}/>
            Neue Geschichte erstellen
          </HoveringPaper>
          <HoveringPaper
            onTouchTap={this.props.openStory}>
            <FolderOpen style={styles.icons}/>
            Geschichte öffnen
          </HoveringPaper>
        </div>
      </div>
    );
  }
}

// TODO
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStory: () => {
      dispatch(createStory());
    },
    onOpenStory: (file) => {
      dispatch(openStory(file));
    }
  }
};

const WelcomeSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(MixedWelcomeSection);

export default WelcomeSection;