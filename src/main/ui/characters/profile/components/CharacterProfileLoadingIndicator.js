import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "material-ui";
import * as s from "../selectors";

const timeout = 2000;

const mapStateToProps = (state) => {
  return {
    isLoading: s.isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const style = {
  progress: {},
  wrapper: {
    height: "100%",
  },
};


// loading for a minimum of 1 second
class CharacterProfileLoadingIndicatorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading,
    };
  }

  getStyle() {
    const propsStyle = {
      wrapperStyle: this.props.wrapperStyle,
      progress: this.props.style,
      wrapper: this.state.isLoading ? style.wrapper : { height: 0 },
    };
    return Object.assign({}, style, propsStyle);
  }

  componentWillReceiveProps(nextProps) {
    const parentSaysIsLoading = this.props.isLoading;
    const willBeLoading = nextProps.isLoading;
    if (parentSaysIsLoading && !willBeLoading) {
      console.log("setting timeout");
      setTimeout(() => {
        this.setState({
          isLoading: willBeLoading
        });
      }, timeout);
    } else {
      this.setState({
        isLoading: willBeLoading
      });
    }
  }

  render() {
    return (
      <div style={this.getStyle().wrapper}>
        {
          this.state.isLoading &&
          <div style={this.getStyle().wrapperStyle}>
            <CircularProgress
              size={24}
              thickness={2}
              style={this.getStyle().progress}
            />
          </div>
        }
      </div>
    );
  }
}

const CharacterProfileLoadingIndicator = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterProfileLoadingIndicatorComponent);

export default CharacterProfileLoadingIndicator;