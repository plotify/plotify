import {
  addOrUpdateRecentlyOpenedFile as _addOrUpdateRecentlyOpenedFile,
  getRecentlyOpenedFiles as _getRecentlyOpenedFiles,
  pinRecentlyOpenedFile as _pinRecentlyOpenedFile,
  removeRecentlyOpenedFile as _removeRecentlyOpenedFile,
  unpinRecentlyOpenedFile as _unpinRecentlyOpenedFile
} from '../../backend/preferences/recently-opened-files'

import { ADD_RECENTLY_OPENED_FILE } from '../../shared/preferences/requests'
import { app } from 'electron'
import { getPreferencesDatabase } from './database'
import { getWindowByStoryPath } from '../windows'
import { request } from '../shared/communication'
import store from '../store'

export const getRecentlyOpenedFiles = async () => {
  return _getRecentlyOpenedFiles(getPreferencesDatabase(store.getState()))
}

export const addOrUpdateRecentlyOpenedFile = async (file) => {
  const database = getPreferencesDatabase(store.getState())
  const updatedFile = await _addOrUpdateRecentlyOpenedFile(database, file)
  app.addRecentDocument(updatedFile.path)
  const window = getWindowByStoryPath(store.getState(), '')
  if (window) {
    request(window, ADD_RECENTLY_OPENED_FILE, updatedFile)
  }
}

export const pinRecentlyOpenedFile = async (path) => {
  const database = getPreferencesDatabase(store.getState())
  await _pinRecentlyOpenedFile(database, path)
}

export const unpinRecentlyOpenedFile = async (path) => {
  const database = getPreferencesDatabase(store.getState())
  await _unpinRecentlyOpenedFile(database, path)
}

export const removeRecentlyOpenedFile = async (path) => {
  const database = getPreferencesDatabase(store.getState())
  await _removeRecentlyOpenedFile(database, path)
}
