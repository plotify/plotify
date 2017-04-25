import * as t from "./actionTypes";

const initialState = {
  open: false,
  message: "",
  autoHideDuration: 5000,
  actionLabel: undefined,
  actionCreator: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case t.SHOW_SNACKBAR:
      return Object.assign({}, state, {
        open: true,
        message: action.payload.message,
        actionLabel: action.payload.actionLabel,
        actionCreator: action.payload.actionCreator
      });

    case t.HIDE_SNACKBAR:
      return Object.assign({}, state, {
        open: false,
        actionLabel: undefined,
        actionCreator: undefined
      });

    default:
      return state;

  }
}
