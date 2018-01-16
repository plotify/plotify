import {
  addOrUpdateRecentlyOpenedFile as _addOrUpdateRecentlyOpenedFile,
  getRecentlyOpenedFiles as _getRecentlyOpenedFiles,
  removeRecentlyOpenedFile as _removeRecentlyOpenedFile
} from '../../backend/preferences/recently-opened-files'

import { ADD_RECENTLY_OPENED_FILE } from '../../shared/preferences/requests'
import { app } from 'electron'
import { getPreferences } from './current'
import { getWindowByStoryPath } from '../windows'
import { request } from '../shared/communication'

export const getRecentlyOpenedFiles = async () => {
  return _getRecentlyOpenedFiles(getPreferences())
}

export const addOrUpdateRecentlyOpenedFile = async (file) => {
  await _addOrUpdateRecentlyOpenedFile(getPreferences(), file)
  app.addRecentDocument(file.path)
  const window = getWindowByStoryPath('')
  if (window) {
    request(window, ADD_RECENTLY_OPENED_FILE, file)
  }
}

export const removeRecentlyOpenedFile = async (path) => {
  await _removeRecentlyOpenedFile(getPreferences(), path)
}
