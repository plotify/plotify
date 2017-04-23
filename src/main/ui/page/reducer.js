import * as t from "./actionTypes";
import { PAGES } from "./constants";

const initialState = {
  id: PAGES.WELCOME.id,
  title: PAGES.WELCOME.title,
  navigation: PAGES.WELCOME.navigation
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.SET_PAGE:
      const page = getPage(action.payload.id);
      return Object.assign({}, state, {
        id: page.id,
        title: page.title,
        navigation: page.navigation
      });

    default:
      return state;

  }
}

function getPage(id) {
  for (let page in PAGES) {
    if (PAGES.hasOwnProperty(page)) {
      if (PAGES[page].id === id) {
        return PAGES[page];
      }
    }
  }
  throw new Error("Unknown page id: " + id);
}
