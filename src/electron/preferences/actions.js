import { closePreferencesDatabase, openPreferencesDatabase } from './database'

import { loadDarkTheme } from './dark-theme'
import { loadRecentlyOpenedFiles } from './recently-opened-files'

export const openPreferences = () => async (dispatch, getState) => {
  await dispatch(openPreferencesDatabase())
  await dispatch(loadDarkTheme())
  await dispatch(loadRecentlyOpenedFiles())
}

export const closePreferences = () => async (dispatch) => {
  await dispatch(closePreferencesDatabase())
}
