import * as t from "./actionTypes";

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState, group, entry;
  switch (action.type) {

    case t.LOAD_PROFILE_REQUEST:
      return Object.assign({}, state, {
        characterId: action.payload.characterId,
        savedName: action.payload.name,
        changedName: action.payload.name,
        deleted: action.payload.deleted,
        loading: true,
        loadingFailed: false,
        error: null,
        groups: {},
        groupsOrder: [],
        entries: {}
      });

    case t.LOAD_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: false,
        loadingFailed: false,
        error: null,
        groups: action.payload.groups.reduce(groupsToMap, {}),
        groupsOrder: action.payload.groups.map(group => group.id),
        entries: action.payload.groups.reduce(groupsEntriesToMap, {})
      });

    case t.LOAD_PROFILE_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loadingFailed: true,
        error: action.payload.error
      });

    case t.SET_CHARACTER_NAME:
      return Object.assign({}, state, {
        changedName: action.payload.changedName
      });

    case t.SAVE_CHARACTER_NAME_REQUEST:
      return Object.assign({}, state, {
        saving: true,
        savingFailed: false,
        error: null
      });

    case t.SAVE_CHARACTER_NAME_SUCCESSFUL:
      return Object.assign({}, state, {
        saving: false,
        savingFailed: false,
        error: null,
        savedName: state.changedName
      });

    case t.SAVE_CHARACTER_NAME_FAILED:
      return Object.assign({}, state, {
        saving: false,
        savingFailed: true,
        error: action.payload.error
      });

    case t.SET_ENTRY_VALUE:
      const entrySetValue = Object.assign({}, state.entries[action.payload.entryId], {
        changedValue: action.payload.changedValue
      });
      const entriesSetValue = Object.assign({}, state.entries, {
        [action.payload.entryId]: entrySetValue
      });
      return Object.assign({}, state, {
        entries: entriesSetValue
      });

    case t.SAVE_ENTRY_VALUE_REQUEST:
      const entryRequest = Object.assign({}, state.entries[action.payload.entryId], {
        saving: true,
        savingFailed: false,
        error: null
      });
      const entriesRequest = Object.assign({}, state.entries, {
        [action.payload.entryId]: entryRequest
      });
      return Object.assign({}, state, {
        entries: entriesRequest
      });

    case t.SAVE_ENTRY_VALUE_SUCCESSFUL:
      const entrySuccessful = Object.assign({}, state.entries[action.payload.entryId], {
        savedValue: state.entries[action.payload.entryId].changedValue,
        saving: false
      });
      const entriesSuccessful = Object.assign({}, state.entries, {
        [action.payload.entryId]: entrySuccessful
      });
      return Object.assign({}, state, {
        entries: entriesSuccessful
      });

    case t.SAVE_ENTRY_VALUE_FAILED:
      const entryFailed = Object.assign({}, state.entries[action.payload.entryId], {
        saving: false,
        savingFailed: true,
        error: action.payload.error
      });
      const entriesFailed = Object.assign({}, state.entries, {
        [action.payload.entryId]: entryFailed
      });
      return Object.assign({}, state, {
        entries: entriesFailed
      });

    default:
      return state;

  }
}

function groupsToMap(groups, group) {
  groups[group.id] = {
    id: group.id,
    title: group.title,
    entriesOrder: group.entries.map(entry => entry.id)
  };
  return groups;
}

function groupsEntriesToMap(entries, group) {
  return group.entries.reduce(entriesToMap, entries);
}

function entriesToMap(entries, entry) {
  entries[entry.id] = {
    id: entry.id,
    title: entry.title,
    savedValue: entry.value,
    changedValue: entry.value,
    saving: false,
    savingFailed: false,
    error: null
  };
  return entries;
}
