import { connect }from "react-redux";
import * as a from "../../story/actions";
import NewWelcomePage from "../_presentation/NewWelcomePage";
import * as aboutActions from "../../about/actions";
import packageJson from "../../../package.json";
const mapStateToProps = (state) => {
  return {
    versionDescription: "Vielen Dank, dass du Plotify verwendest. Erstelle eine fantastische Geschichte!",
    versionName:        packageJson.productName + " " + packageJson.version,
    logoUrl:            "resources/app-icons/64.png",
    newStoryLabel:      "Neue Geschichte",
    openStoryLabel:     "Geschichte öffnen",
    newStoryIconUrl:    "resources/icons/material-new.png",
    openStoryIconUrl:   "resources/icons/material-open.png",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openStory:         () => dispatch(a.openStoryDialog()),
    createStory:       () => dispatch(a.createStory()),
    onOpenAboutDialog: () => dispatch(aboutActions.showAboutDialog()),
  }
};

const WelcomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewWelcomePage);

export default WelcomePage;
