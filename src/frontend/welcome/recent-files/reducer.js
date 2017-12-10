import * as t from './action-types'

const initialState = {
  showFolderNotFoundDialog: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.OPEN_FOLDER_NOT_FOUND_DIALOG:
      return Object.assign({}, state, {
        showFolderNotFoundDialog: true
      })

    case t.CLOSE_FOLDER_NOT_FOUND_DIALOG:
      return Object.assign({}, state, {
        showFolderNotFoundDialog: false
      })

    default:
      return state
  }
}

export default reducer
