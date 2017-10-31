import * as t from './actionTypes';

const initialState = {
  aboutOpen: false
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case t.OPEN_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: true
      });

    case t.CLOSE_ABOUT_DIALOG:
      return Object.assign({}, state, {
        aboutOpen: false
      });
    
    default:
      return state;

  }
}

export default reducer;
