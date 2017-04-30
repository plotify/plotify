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
  return state.characters.profile.loading;
}

export function isLoadingFailed(state) {
  return state.characters.profile.loadingFailed;
}

export function getLoadingError(state) {
  if (isLoadingFailed(state)) {
    return state.characters.profile.error;
  } else {
    return null;
  }
}

export function isSaving(state) {
  return state.characters.profile.saving;
}

export function isSavingFailed(state) {
  return state.characters.profile.savingFailed;
}

export function getSavingError(state) {
  if (isSavingFailed(state)) {
    return state.characters.profile.error;
  } else {
    return null;
  }
}

export function getGroupsInOrder(state) {
  return state.characters.profile.groupsOrder.map(id => mapToGroup(state, id));
}

function mapToGroup(state, id) {
  const group = state.characters.profile.groups[id];
  return {
    id: group.id,
    title: group.title,
    entries: group.entriesOrder.map(id => mapToEntry(state, id))
  };
}

function mapToEntry(state, id) {
  const entry = state.characters.profile.entries[id];
  return {
    id: entry.id,
    title: entry.title,
    value: entry.changedValue
  };
}

export function hasEntryValueChanged(state, entryId) {
  const entry = state.characters.profile.entries[entryId];
  return entry.changedValue !== entry.savedValue;
}

export function getEntryValue(state, entryId) {
  const entry = state.characters.profile.entries[entryId];
  return entry.changedValue;
}
