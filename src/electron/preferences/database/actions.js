import * as t from './action-types'

import { isDarkThemeEnabled, openOrCreate } from '../../../backend/preferences'

import { app } from 'electron'
import { getPreferencesDatabase } from './selectors'
import { join } from 'path'
import { setDarkThemeEnabled } from '../dark-theme'

const PREFERENCES_DIRECTORY = 'userData'
const PREFERENCES_FILE = 'plotify.preferences.db'

export const openPreferences = () => async (dispatch, getState) => {
  if (getPreferencesDatabase(getState())) {
    return
  }

  const directory = app.getPath(PREFERENCES_DIRECTORY)
  const path = join(directory, PREFERENCES_FILE)
  const database = await openOrCreate(path)
  dispatch(setPreferncesDatabase(database))

  const darkThemeEnabled = await isDarkThemeEnabled(database)
  dispatch(setDarkThemeEnabled(darkThemeEnabled))
}

export const closePreferences = () => async (dispatch, getState) => {
  if (!getPreferencesDatabase(getState())) {
    return
  }

  const database = getPreferencesDatabase(getState())
  await database.close()
  dispatch(setPreferncesDatabase(null))
}

const setPreferncesDatabase = (database) => ({
  type: t.SET_PREFERENCES_DATABASE,
  payload: { database }
})
