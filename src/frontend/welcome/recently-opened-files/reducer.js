import * as t from './action-types'

const initialState = {
  files: [],
  showFolderNotFoundDialog: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_RECENTLY_OPENED_FILES_REQUEST:
      return Object.assign({}, state, {
        error: null
      })
    case t.GET_RECENTLY_OPENED_FILES_FAILED:
      return Object.assign({}, state, {
        error: action.payload.message
      })
    case t.GET_RECENTLY_OPENED_FILES_SUCCESSFUL:
      return Object.assign({}, state, {
        files: action.payload.files.map((file) => ({ ...file, removing: false })),
        error: null
      })

    case t.REMOVE_RECENTLY_OPENED_FILE_REQUEST:
      return Object.assign({}, state, {
        files: state.files.filter((file) => file.path !== action.payload.path),
        error: null
      })
    case t.REMOVE_RECENTLY_OPENED_FILE_FAILED:
      return Object.assign({}, state, {
        files: [ ...state.files, { path: action.payload.path, pinned: false } ],
        error: action.payload.message
      })
    case t.REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL:
      return Object.assign({}, state, {
        error: null
      })

    case t.OPEN_FOLDER_NOT_FOUND_DIALOG:
      return Object.assign({}, state, {
        showFolderNotFoundDialog: true
      })
    case t.CLOSE_FOLDER_NOT_FOUND_DIALOG:
      return Object.assign({}, state, {
        showFolderNotFoundDialog: false
      })

    case t.REMOVE_ERROR:
      return Object.assign({}, state, {
        error: null
      })

    case t.ADD_RECENTLY_OPENED_FILE:
      const files = state.files.filter((file) => file.path !== action.payload.file.path)
      return Object.assign({}, state, {
        files: [ action.payload.file, ...files ]
      })

    default:
      return state
  }
}

export default reducer
