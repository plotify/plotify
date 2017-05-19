import { createSelector } from "reselect";

const getPage = (state) => state.page;

export const getCurrentPageId = createSelector(
  [getPage],
  (page) => {
    return page.id;
  }
);

export const getCurrentPageTitle = createSelector(
  [getPage],
  (page) => {
    return page.title;
  }
);

export const hasCurrentPageNavigation = createSelector(
  [getPage],
  (page) => {
    return page.navigation === true;
  }
);
