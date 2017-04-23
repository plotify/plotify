export function getCurrentPageId(state) {
  return state.page.id;
}

export function getCurrentPageTitle(state) {
  return state.page.title;
}

export function hasCurrentPageNavigation(state) {
  return state.page.navigation === true;
}
