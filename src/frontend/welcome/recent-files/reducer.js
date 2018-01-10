import * as t from './action-types'

const initialState = {
  files: [],
  showFolderNotFoundDialog: false,
  error: null
}

// TODO GET_RECENTLY_OPENED_FILES_REQUEST, GET_RECENTLY_OPENED_FILES_FAILED
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_RECENTLY_OPENED_FILES_SUCCESSFUL:
      return Object.assign({}, state, {
        files: action.payload.files.map((file) => ({ ...file, removing: false }))
      })

    case t.REMOVE_RECENTLY_OPENED_FILE_REQUEST:
      return Object.assign({}, state, {
        files: updateRemoving(state, action.payload.path, true)
      })
    case t.REMOVE_RECENTLY_OPENED_FILE_FAILED:
      return Object.assign({}, state, {
        files: updateRemoving(state, action.payload.path, false),
        error: action.payload.message
      })
    case t.REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL:
      return Object.assign({}, state, {
        files: state.files.filter(file => file.path !== action.payload.path)
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

    default:
      return state
  }
}

const updateRemoving = (state, path, removing) => {
  return state.files.map((file) => {
    if (file.path === path) {
      return { ...file, removing }
    } else {
      return file
    }
  })
}

export default reducer
