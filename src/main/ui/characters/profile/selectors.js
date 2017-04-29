import list from "../list";

export function isVisible(state) {
  return state.characters.profile.hasOwnProperty("characterId");
}

export function getCharacterId(state) {
  return state.characters.profile.characterId;
}

export function getCharacterName(state) {
  return state.characters.profile.changedName;
}

export function hasCharacterNameChanged(state) {
  return state.characters.profile.changedName !== state.characters.profile.savedName;
}

export function isCharacterDeleted(state) {
  return state.characters.profile.deleted;
}

export function isLoading(state) {
  return state.characters.profile.status.loading;
}

export function isLoadingFailed(state) {
  return state.characters.profile.status.loadingFailed;
}

export function getLoadingError(state) {
  if (isLoadingFailed(state)) {
    return state.characters.profile.status.error;
  } else {
    return null;
  }
}

export function isSaving(state) {
  return state.characters.profile.status.saving;
}

export function isSavingFailed(state) {
  return state.characters.profile.status.savingFailed;
}

export function getSavingError(state) {
  if (isSavingFailed(state)) {
    return state.characters.profile.status.error;
  } else {
    return null;
  }
}

export function getGroupsInOrder(state) {
  return state.characters.profile.order.map(id => mapToGroup(state, id));
}

function mapToGroup(state, id) {
  const group = state.characters.profile.groups[id];
  return {
    id: group.id,
    title: group.title,
    entries: group.order.map(id => mapToEntry(group, id))
  };
}

function mapToEntry(group, id) {
  const entry = group.entries[id];
  return {
    id: entry.id,
    title: entry.title,
    value: entry.changedValue
  };
}
