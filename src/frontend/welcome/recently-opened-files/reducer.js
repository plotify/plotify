import * as t from './action-types'

const initialState = {
  files: [],
  showFolderNotFoundDialog: false,
  error: null
}

// TODO Error pro Aktion
const reducer = (state = initialState, action) => {
  let files
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
        files: action.payload.files.map((file) => ({ ...file })),
        error: null
      })

    case t.PIN_RECENTLY_OPENED_FILE_REQUEST:
    case t.UNPIN_RECENTLY_OPENED_FILE_REQUEST:
      files = state.files.filter((file) => file.path !== action.payload.path)
      files = [{ path: action.payload.path, pinned: action.payload.pin }, ...files]
      return Object.assign({}, state, {
        files,
        error: null
      })
    case t.PIN_RECENTLY_OPENED_FILE_FAILED:
    case t.UNPIN_RECENTLY_OPENED_FILE_FAILED:
      files = state.files.filter((file) => file.path !== action.payload.path)
      files = [...files, { path: action.payload.path, pinned: !action.payload.pin }]
      return Object.assign({}, state, {
        files,
        error: action.payload.message
      })
    case t.PIN_RECENTLY_OPENED_FILE_SUCCESSFUL:
    case t.UNPIN_RECENTLY_OPENED_FILE_SUCCESSFUL:
      return Object.assign({}, state, {
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
      files = state.files.filter((file) => file.path !== action.payload.file.path)
      return Object.assign({}, state, {
        files: [ action.payload.file, ...files ]
      })

    default:
      return state
  }
}

export default reducer
