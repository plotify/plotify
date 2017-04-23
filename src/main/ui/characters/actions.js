import page from "../page";
import charactersList from "./list";

export function handleSetPage() {
  return (dispatch, getState) => {

    const pageId = page.constants.PAGES.CHARACTERS.id;
    const currentPageId = page.selectors.getCurrentPageId(getState());

    if (pageId === currentPageId) {
      return dispatch(charactersList.actions.findCharacters());
    } else {
      return Promise.resolve();
    }

  };
}
