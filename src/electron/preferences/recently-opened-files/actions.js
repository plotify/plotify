import {
  addOrUpdateRecentlyOpenedFile as _addOrUpdateRecentlyOpenedFile,
  pinRecentlyOpenedFile as _pinRecentlyOpenedFile,
  removeRecentlyOpenedFile as _removeRecentlyOpenedFile,
  unpinRecentlyOpenedFile as _unpinRecentlyOpenedFile,
  getRecentlyOpenedFiles
} from '../../../backend/preferences/recently-opened-files'

import { ADD_RECENTLY_OPENED_FILE } from '../../../shared/preferences/requests'
import { SET_RECENTLY_OPENED_FILES } from './action-types'
import { app } from 'electron'
import { getPreferencesDatabase } from '../database'
import { getWindowByStoryPath } from '../../windows/selectors'
import { request } from '../../shared/communication'

export const loadRecentlyOpenedFiles = () => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  const files = await getRecentlyOpenedFiles(database)
  dispatch(setRecentlyOpenedFiles(files))
}

export const addOrUpdateRecentlyOpenedFile = (file) => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  const updatedFile = await _addOrUpdateRecentlyOpenedFile(database, file)
  app.addRecentDocument(updatedFile.path)
  await dispatch(loadRecentlyOpenedFiles())

  const window = getWindowByStoryPath(getState(), '')
  if (window) {
    request(window, ADD_RECENTLY_OPENED_FILE, updatedFile)
  }
}

export const pinRecentlyOpenedFile = (path) => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  await _pinRecentlyOpenedFile(database, path)
  await dispatch(loadRecentlyOpenedFiles())
}

export const unpinRecentlyOpenedFile = (path) => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  await _unpinRecentlyOpenedFile(database, path)
  await dispatch(loadRecentlyOpenedFiles())
}

export const removeRecentlyOpenedFile = (path) => async (dispatch, getState) => {
  const database = getPreferencesDatabase(getState())
  await _removeRecentlyOpenedFile(database, path)
  await dispatch(loadRecentlyOpenedFiles())
}

export const setRecentlyOpenedFiles = (files) => ({
  type: SET_RECENTLY_OPENED_FILES,
  payload: { files }
})
