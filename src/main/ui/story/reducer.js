import * as t from "./actionTypes";

const initialState = {

  loading: false,
  closing: false,

  open: false,
  file: null,
  error: null

};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.OPEN_STORY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        file: action.payload.file,
        error: null
      });
    case t.OPEN_STORY_SUCCESSFUL:
      return Object.assign({}, state, {
        loading: false,
        open: true
      });
    case t.OPEN_STORY_FAILED:
      return Object.assign({}, state, {
        loading: false,
        file: null,
        error: action.payload.error
      });

    case t.CLOSE_STORY_REQUEST:
      return Object.assign({}, state, {
        closing: true,
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
        error: action.payload.error
      });

    default:
      return state;

  }
}
