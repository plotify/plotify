export function isLoading(state) {
  return state.characters.list.loading === true;
}

export function isLoadingFailed(state) {
  return state.characters.list.error !== null;
}

export function getLoadingError(state) {
  return state.characters.list.error;
}

export function getListFilter(state) {
  return state.characters.list.filter;
}

export function getCharactersInOrder(state) {
  return state.characters.list.order.map(
    id => state.characters.list.characters[id]);
}

export function isCharacterSelected(state) {
  return state.characters.list.selected !== null;
}

export function getSelectedCharacterId(state) {
  return state.characters.list.selected;
}

export function getSelectedCharacter(state) {
  return state.characters.list.characters[getSelectedCharacterId(state)];
}
