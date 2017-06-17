import { createSelector } from "reselect";

const getCharactersList = (state) => state.characters.list;

export const isLoading = createSelector(
  [getCharactersList],
  (list) => {
    return list.loading === true;
  }
);

export const isLoadingFailed = createSelector(
  [getCharactersList],
  (list) => {
    return list.error !== null;
  }
);

export const getLoadingError = createSelector (
  [getCharactersList],
  (list) => {
    return list.error;
  }
);

export const getListFilter = createSelector(
  [getCharactersList],
  (list) => {
    return list.filter;
  }
);

export const getCharactersInOrder = createSelector(
  [getCharactersList],
  (list) => {
    return list.order.map(
      id => list.characters[id]
    );
  }
);

export const isCharacterSelected = createSelector(
  [getCharactersList],
  (list) => {
    return list.selected !== null;
  }
);

export const getSelectedCharacterId = createSelector(
  [getCharactersList],
  (list) => {
    return list.selected;
  }
);

export const getSelectedCharacter = createSelector(
  [getCharactersList, getSelectedCharacterId],
  (list, id) => {
    return list.characters[id];
  }
);
