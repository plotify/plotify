import * as t from "./actionTypes";

const initialState = {
  loading: false,
  loadingFailed: false,
  closing: false,
  closingFailed: false,
  creating: false,
  creationFailed: false,
  error: null,
  open: false,
  file: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.OPEN_STORY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        loadingFailed: false,
        closing: false,
        closingFailed: false,
        creating: false,
        creationFailed: false,
        error: null,
        open: false,
        file: action.payload.file,
      });
    case t.OPEN_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: false,
        open: true
      });
    case t.OPEN_STORY_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loadingFailed: true,
        error: action.payload.error,
        file: null
      });

    case t.CLOSE_STORY_REQUEST:
      return Object.assign({}, state, {
        loading: false,
        loadingFailed: false,
        closing: true,
        closingFailed: false,
        creating: false,
        creationFailed: false,
        error: null
      });
    case t.CLOSE_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        closing: false,
        open: false,
        file: null
      });
    case t.CLOSE_STORY_FAILED:
      return Object.assign({}, state, {
        closing: false,
        closingFailed: true,
        error: action.payload.error
      });

    case t.CREATE_STORY_REQUEST:
      return Object.assign({}, state, {
        loading: false,
        loadingFailed: false,
        closing: false,
        closingFailed: false,
        creating: true,
        creationFailed: false,
        error: null
      });

    case t.CREATE_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        creating: false
      });

    case t.CREATE_STORY_FAILED:
      return Object.assign({}, state, {
        creating: false,
        creationFailed: true,
        error: action.payload.error
      });

    default:
      return state;

  }
}
