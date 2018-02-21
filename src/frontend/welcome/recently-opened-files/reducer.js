import {
  ADD_RECENTLY_OPENED_FILE,
  CLOSE_FOLDER_NOT_FOUND_DIALOG,
  GET_RECENTLY_OPENED_FILES_FAILED,
  GET_RECENTLY_OPENED_FILES_REQUEST,
  GET_RECENTLY_OPENED_FILES_SUCCESSFUL,
  OPEN_FOLDER_NOT_FOUND_DIALOG,
  PIN_UNPIN_RECENTLY_OPENED_FILE_FAILED,
  PIN_UNPIN_RECENTLY_OPENED_FILE_REQUEST,
  PIN_UNPIN_RECENTLY_OPENED_FILE_SUCCESSFUL,
  REMOVE_ERROR,
  REMOVE_RECENTLY_OPENED_FILE_FAILED,
  REMOVE_RECENTLY_OPENED_FILE_REQUEST,
  REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL
} from './action-types'

import { createReducer } from '../../../shared/redux'

const initialState = {
  files: [],
  showFolderNotFoundDialog: false,
  error: null
}

const removeError = (state) => ({
  ...state,
  error: null
})

export default createReducer(initialState, {
  [GET_RECENTLY_OPENED_FILES_REQUEST]: removeError,
  [GET_RECENTLY_OPENED_FILES_FAILED]: (state, { message }) => ({
    ...state,
    error: message
  }),
  [GET_RECENTLY_OPENED_FILES_SUCCESSFUL]: (state, { files }) => ({
    ...state,
    files: files.map((file) => ({ ...file })),
    error: null
  }),

  [PIN_UNPIN_RECENTLY_OPENED_FILE_REQUEST]: (state, { path, pin }) => {
    const files = state.files.filter((file) => file.path !== path)
    const file = { path, pinned: pin }
    return {
      ...state,
      files: [ file, ...files ],
      error: null
    }
  },
  [PIN_UNPIN_RECENTLY_OPENED_FILE_FAILED]: (state, { path, pin, message }) => {
    const files = state.files.filter((file) => file.path !== path)
    const file = { path, pinned: !pin }
    return {
      ...state,
      files: [ ...files, file ],
      error: message
    }
  },
  [PIN_UNPIN_RECENTLY_OPENED_FILE_SUCCESSFUL]: removeError,

  [REMOVE_RECENTLY_OPENED_FILE_REQUEST]: (state, { path }) => ({
    ...state,
    files: state.files.filter((file) => file.path !== path),
    error: null
  }),
  [REMOVE_RECENTLY_OPENED_FILE_FAILED]: (state, { path, message }) => ({
    ...state,
    files: [ ...state.files, { path, pinned: false } ],
    error: message
  }),
  [REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL]: removeError,

  [OPEN_FOLDER_NOT_FOUND_DIALOG]: (state) => ({
    ...state,
    showFolderNotFoundDialog: true
  }),
  [CLOSE_FOLDER_NOT_FOUND_DIALOG]: (state) => ({
    ...state,
    showFolderNotFoundDialog: false
  }),

  [REMOVE_ERROR]: removeError,

  [ADD_RECENTLY_OPENED_FILE]: (state, { file }) => {
    const files = state.files.filter((f) => f.path !== file.path)
    return {
      ...state,
      files: [ file, ...files ]
    }
  }
})
