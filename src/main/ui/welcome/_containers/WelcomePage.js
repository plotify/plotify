import { connect }from "react-redux";
import * as a from "../../story/actions";
import NewWelcomePage from "../_presentation/NewWelcomePage";
const mapStateToProps = (state) => {
  return {
    versionDescription: "Vielen Dank, dass du Plotify verwendest. Erstelle eine fantastische Geschichte!",
    versionName:        "Plotify Version 0.2.0 Beta",
    logoUrl:            "resources/app-icons/64.png",
    newStoryLabel:      "Neue Geschichte",
    openStoryLabel:     "Geschichte öffnen",
    newStoryIconUrl: "resources/icons/material-new.png",
    openStoryIconUrl: "resources/icons/material-open.png"
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openStory:   () => dispatch(a.openStoryDialog()),
    createStory: () => dispatch(a.createStory()),
  }
};

const WelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewWelcomePage);

export default WelcomePage;
