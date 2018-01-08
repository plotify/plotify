import * as t from './action-types'

const initialState = {
  files: [],
  showFolderNotFoundDialog: false
}

// TODO GET_RECENTLY_OPENED_FILES_REQUEST, GET_RECENTLY_OPENED_FILES_FAILED
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_RECENTLY_OPENED_FILES_SUCCESSFUL:
      return Object.assign({}, state, {
        files: action.payload.files
      })

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
