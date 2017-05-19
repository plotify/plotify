import React, { Component } from "react";
import StoryOpenPaper from "./StoryOpenPaper";
import StoryCreatePaper from "./StoryCreatePaper";

const styles = {
  wrapper: {
    position: "fixed",
    height: "100%",
    width: "100%",
  },
};

export default class WelcomePageComponent extends Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <StoryCreatePaper />
        <StoryOpenPaper />
      </div>
    );
  }
}
