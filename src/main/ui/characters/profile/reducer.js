import * as t from "./actionTypes";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.LOAD_PROFILE_REQUEST:
      return Object.assign({}, state, {
        characterId: action.payload.characterId,
        savedName: action.payload.name,
        changedName: action.payload.name,
        deleted: action.payload.deleted,
        status: {
            loading: true,
            loadingFailed: false,
            saving: false,
            savingFailed: false,
            error: null
        },
        groups: {},
        order: []
      });

    case t.LOAD_PROFILE_SUCCESSFUL:
      return Object.assign({}, state, {
        status: {
            loading: false,
            loadingFailed: false,
            saving: false,
            savingFailed: false,
            error: null
        },
        groups: action.payload.groups.reduce(groupsToMap, {}),
        order: action.payload.groups.map(group => group.id)
      });

    case t.LOAD_PROFILE_FAILED:
      return Object.assign({}, state, {
        status: {
            loading: false,
            loadingFailed: true,
            saving: false,
            savingFailed: false,
            error: action.payload.error
        }
      });

    case t.SET_CHARACTER_NAME:
      return Object.assign({}, state, {
        changedName: action.payload.changedName
      });

    case t.SAVE_CHARACTER_NAME_REQUEST:
      return Object.assign({}, state, {
        status: {
            loading: false,
            loadingFailed: false,
            saving: true,
            savingFailed: false,
            error: null
        }
      });

    case t.SAVE_CHARACTER_NAME_SUCCESSFUL:
      return Object.assign({}, state, {
        status: {
            loading: false,
            loadingFailed: false,
            saving: false,
            savingFailed: false,
            error: null
        },
        savedName: state.changedName
      });

    case t.SAVE_CHARACTER_NAME_FAILED:
      return Object.assign({}, state, {
        status: {
            loading: false,
            loadingFailed: false,
            saving: false,
            savingFailed: true,
            error: action.payload.error
        }
      });

    default:
      return state;

  }
}

function groupsToMap(groups, group) {
  groups[group.id] = {
    id: group.id,
    title: group.title,
    entries: group.entries.reduce(entriesToMap, {}),
    order: group.entries.map(entry => entry.id)
  };
  return groups;
}

function entriesToMap(entries, entry) {
  entries[entry.id] = {
    id: entry.id,
    title: entry.title,
    savedValue: entry.value,
    changedValue: entry.value,
    status: {
      saving: false,
      savingFailed: false,
      error: null
    }
  };
  return entries;
}
