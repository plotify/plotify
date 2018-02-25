import * as t from './action-types'

import {
  GET_RECENTLY_OPENED_FILES,
  PIN_RECENTLY_OPENED_FILE,
  REMOVE_RECENTLY_OPENED_FILE,
  UNPIN_RECENTLY_OPENED_FILE
} from '../../../shared/preferences/requests'

import { request } from '../../shared/communication'
import { shell } from 'electron'

export const getRecentlyOpenedFiles = () => async (dispatch) => {
  dispatch(getRecentlyOpenedFilesRequest())
  try {
    const files = await request(GET_RECENTLY_OPENED_FILES)
    dispatch(getRecentlyOpenedFilesSuccessful(files))
  } catch (error) {
    console.log('Error: getRecentlyOpenedFiles:', error)
    const message = 'Die zuletzt geöffneten Dateien konnten nicht geladen werden.'
    dispatch(getRecentlyOpenedFilesFailed(message))
  }
}

export const getRecentlyOpenedFilesRequest = () => ({
  type: t.GET_RECENTLY_OPENED_FILES_REQUEST,
  payload: {}
})

export const getRecentlyOpenedFilesSuccessful = (files) => ({
  type: t.GET_RECENTLY_OPENED_FILES_SUCCESSFUL,
  payload: { files }
})

export const getRecentlyOpenedFilesFailed = (message) => ({
  type: t.GET_RECENTLY_OPENED_FILES_FAILED,
  payload: { message }
})

export const pinRecentlyOpenedFile = (path) => async (dispatch) => {
  dispatch(pinRecentlyOpenedFileRequest(path))
  try {
    await request(PIN_RECENTLY_OPENED_FILE, path)
    dispatch(pinRecentlyOpenedFileSuccessful(path))
  } catch (error) {
    const message = 'Die Datei konnte nicht angeheftet werden.'
    dispatch(pinRecentlyOpenedFileFailed(path, message))
  }
}

export const pinRecentlyOpenedFileRequest = (path) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_REQUEST,
  payload: { path, pin: true }
})

export const pinRecentlyOpenedFileSuccessful = (path) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_SUCCESSFUL,
  payload: { path, pin: true }
})

export const pinRecentlyOpenedFileFailed = (path, message) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_FAILED,
  payload: { path, message, pin: true }
})

export const unpinRecentlyOpenedFile = (path) => async (dispatch) => {
  dispatch(unpinRecentlyOpenedFileRequest(path))
  try {
    await request(UNPIN_RECENTLY_OPENED_FILE, path)
    dispatch(unpinRecentlyOpenedFileSuccessful(path))
  } catch (error) {
    const message = 'Die Datei konnte nicht gelöst werden.'
    dispatch(unpinRecentlyOpenedFileFailed(path, message))
  }
}

export const unpinRecentlyOpenedFileRequest = (path) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_REQUEST,
  payload: { path, pin: false }
})

export const unpinRecentlyOpenedFileSuccessful = (path) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_SUCCESSFUL,
  payload: { path, pin: false }
})

export const unpinRecentlyOpenedFileFailed = (path, message) => ({
  type: t.PIN_UNPIN_RECENTLY_OPENED_FILE_FAILED,
  payload: { path, message, pin: false }
})

export const removeRecentlyOpenedFile = (path) => async (dispatch) => {
  dispatch(removeRecentlyOpenedFileRequest(path))
  try {
    await request(REMOVE_RECENTLY_OPENED_FILE, path)
    removeRecentlyOpenedFileSuccessful(path)
  } catch (error) {
    const message = 'Die Datei konnte nicht aus der Liste entfernt werden.'
    dispatch(removeRecentlyOpenedFileFailed(path, message))
  }
}

export const removeRecentlyOpenedFileRequest = (path) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_REQUEST,
  payload: { path }
})

export const removeRecentlyOpenedFileSuccessful = (path) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL,
  payload: { path }
})

export const removeRecentlyOpenedFileFailed = (path, message) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_FAILED,
  payload: { path, message }
})

export const openFileInFolder = (path) => async (dispatch) => {
  const successful = shell.showItemInFolder(path)
  if (!successful) {
    dispatch(openFolderNotFoundDialog())
  }
}

export const openFolderNotFoundDialog = () => ({
  type: t.OPEN_FOLDER_NOT_FOUND_DIALOG,
  payload: {}
})

export const closeFolderNotFoundDialog = () => ({
  type: t.CLOSE_FOLDER_NOT_FOUND_DIALOG,
  payload: {}
})

export const removeError = () => ({
  type: t.REMOVE_ERROR,
  payload: {}
})

export const addRecentlyOpenedFile = (file) => ({
  type: t.ADD_RECENTLY_OPENED_FILE,
  payload: { file }
})
