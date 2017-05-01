import * as t from "./actionTypes";

const initialState = {
  open: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.SHOW_ABOUT_DIALOG:
      return Object.assign({}, state, {
        open: true
      });

    case t.HIDE_ABOUT_DIALOG:
      return Object.assign({}, state, {
        open: false
      });

    default:
      return state;

  }
}
