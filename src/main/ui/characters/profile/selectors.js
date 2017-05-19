import { createSelector } from "reselect";
import list from "../list";

const getProfile = (state) => state.characters.profile;

export const isVisible = createSelector(
  [getProfile],
  (profile) => {
    return profile.hasOwnProperty("characterId");
  }
);

export const getCharacterId = createSelector(
  [getProfile],
  (profile) => {
    return profile.characterId;
  }
);

export const getCharacterName = createSelector(
  [getProfile],
  (profile) => {
    return profile.changedName;
  }
);

export const hasCharacterNameChanged = createSelector(
  [getProfile],
  (profile) => {
    return profile.changedName !== profile.savedName;
  }
);

export const isCharacterDeleted = createSelector(
  [getProfile],
  (profile) => {
    return profile.deleted;
  }
);

export const isLoading = createSelector(
  [getProfile],
  (profile) => {
    return profile.loading;
  }
);

export const isLoadingFailed = createSelector(
  [getProfile],
  (profile) => {
    return profile.loadingFailed;
  }
);

export const getLoadingError = createSelector(
  [getProfile, isLoadingFailed],
  (profile, loadingFailed) => {
    if (loadingFailed) {
      return profile.error;
    } else {
      return null;
    }
  }
);

export const isSaving = createSelector(
  [getProfile],
  (profile) => {
    return profile.saving;
  }
);

export const isSavingFailed = createSelector(
  [getProfile],
  (profile) => {
    return profile.savingFailed;
  }
);

export const getSavingError = createSelector(
  [getProfile, isSavingFailed],
  (profile, savingFailed) => {
    if (savingFailed) {
      return profile.error;
    } else {
      return null;
    }
  }
);

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

const getEntry = (state, props) => getProfile(state).entries[props.entryId];

// Depricated
export function hasEntryValueChanged(state, entryId) {
  const entry = getEntry(state, { entryId });
  return entry.changedValue !== entry.savedValue;
}

export const makeHasEntryValueChanged = () => {
  return createSelector(
    [getEntry],
    (entry) => {
      return entry.changedValue !== entry.savedValue;
    }
  );
};

export const makeGetEntryValue = () => {
  return createSelector(
    [getEntry],
    (entry) => {
      return entry.changedValue;
    }
  );
};

export const makeIsEntrySaving = () => {
  return  createSelector(
    [getEntry],
    (entry) => {
      return entry.saving;
    }
  );
};

export const makeIsEntrySavingFailed = () => {
  return createSelector(
    [getEntry],
    (entry) => {
      return entry.savingFailed;
    }
  );
};

export const makeGetEntrySavingError = () => {
  return createSelector(
    [getEntry, makeIsEntrySavingFailed],
    (entry, entrySavingFailed) => {
      if (entrySavingFailed) {
        return entry.error;
      } else {
        return null;
      }
    }
  );
};
