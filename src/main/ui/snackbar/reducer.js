import * as t from "./actionTypes";

const initialState = {
  open: false,
  message: "",
  autoHideDuration: 5000
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.SHOW_SNACKBAR:
      return Object.assign({}, state, {
        open: true,
        message: action.payload.message
      });

    case t.HIDE_SNACKBAR:
      return Object.assign({}, state, {
        open: false
      });

    default:
      return state;

  }
}
