import { connect } from "react-redux";
import * as a from "../actions";
import * as storyActions from "../../story/actions";
import * as storySelectors from "../../story/selectors";
import * as s from "../selectors";
import MainNavigation from "../_presentation/MainNavigation";
import { PAGES } from "../constants";

const mapStateToProps = (state) => {
  return {
    currentPageId: s.getCurrentPageId(state),
    characters:    storySelectors.isStoryOpen(state),
    groups:        false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateStory: () => dispatch(storyActions.createStory()),
    handleOpenStory:   () => dispatch(storyActions.openStoryDialog()),
    toCharacters:      () => dispatch(a.setPage(PAGES.CHARACTERS.id)),
  }
};

const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNavigation);

export default Navigation;
