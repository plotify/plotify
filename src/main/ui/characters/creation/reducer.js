import * as t from "./actionTypes";

const initialState = {
  creating: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.CREATE_CHARACTER_REQUEST:
      return Object.assign({}, state, {
        creating: true,
        error: null
      });

    case t.CREATE_CHARACTER_SUCCESSFUL:
      return Object.assign({}, state, {
        creating: false,
        error: null
      });

    case t.CREATE_CHARACTER_FAILED:
      return Object.assign({}, state, {
        creating: false,
        error: action.payload.error
      });

    default:
      return state;

  }
}
