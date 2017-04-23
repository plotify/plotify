import { registerChain } from "../chained-actions";
import story from "../story";
import page from "../page";
import { handleSetPage } from "./actions";

export default function registerChains() {
  registerChain(story.actionTypes.OPEN_STORY_SUCCESSFUL,
                () => page.actions.setPage(page.constants.PAGES.CHARACTERS.id));
  registerChain(page.actionTypes.SET_PAGE, handleSetPage);
}
