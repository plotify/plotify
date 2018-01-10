import * as t from './action-types'

import { GET_RECENTLY_OPENED_FILES, REMOVE_RECENTLY_OPENED_FILE } from '../../../shared/preferences/requests'

import { request } from '../../shared/communication'
import { shell } from 'electron'

export const getRecentlyOpenedFiles = () => {
  return async (dispatch) => {
    dispatch(getRecentlyOpenedFilesRequest())
    try {
      const files = await request(GET_RECENTLY_OPENED_FILES)
      dispatch(getRecentlyOpenedFilesSuccessful(files))
    } catch (error) {
      dispatch(getRecentlyOpenedFilesFailed(error.message))
    }
  }
}

const getRecentlyOpenedFilesRequest = () => ({
  type: t.GET_RECENTLY_OPENED_FILES_REQUEST,
  payload: {}
})

const getRecentlyOpenedFilesSuccessful = (files) => ({
  type: t.GET_RECENTLY_OPENED_FILES_SUCCESSFUL,
  payload: { files }
})

const getRecentlyOpenedFilesFailed = (message) => ({
  type: t.GET_RECENTLY_OPENED_FILES_FAILED,
  payload: { message }
})

export const removeRecentlyOpenedFile = (path) => {
  return async (dispatch) => {
    dispatch(removeRecentlyOpenedFileRequest(path))
    try {
      await request(REMOVE_RECENTLY_OPENED_FILE, path)
      // Verzögerung beim Entfernen der Datei, damit die Animation noch vollständig durchgeführt wird:
      setTimeout(() => dispatch(removeRecentlyOpenedFileSuccessful(path)), 150)
    } catch (error) {
      console.log('Error: removeRecentlyOpenedFile:', error)
      const message = 'Die Datei konnte nicht aus der Liste entfernt werden.'
      setTimeout(() => dispatch(removeRecentlyOpenedFileFailed(path, message)), 150)
    }
  }
}

const removeRecentlyOpenedFileRequest = (path) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_REQUEST,
  payload: { path }
})

const removeRecentlyOpenedFileSuccessful = (path) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_SUCCESSFUL,
  payload: { path }
})

const removeRecentlyOpenedFileFailed = (path, message) => ({
  type: t.REMOVE_RECENTLY_OPENED_FILE_FAILED,
  payload: { path, message }
})

export const openFileInFolder = (path) => {
  return async (dispatch) => {
    const successful = shell.showItemInFolder(path)
    if (!successful) {
      dispatch(openFolderNotFoundDialog())
    }
  }
}

const openFolderNotFoundDialog = () => ({
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
