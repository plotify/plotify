export function getListFilter(state) {
  return state.characters.list.filter;
}

export function getCharactersInOrder(state) {
  return state.characters.list.order.map(
    id => state.characters.list.characters[id]);
}
