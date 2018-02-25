import * as t from './action-types'

import { app } from 'electron'
import { getPreferencesDatabase } from './selectors'
import { join } from 'path'
import { openOrCreate } from '../../../backend/preferences'

const PREFERENCES_DIRECTORY = 'userData'
const PREFERENCES_FILE = 'plotify.preferences.db'

export const openPreferencesDatabase = () => async (dispatch, getState) => {
  if (getPreferencesDatabase(getState())) {
    return
  }

  const directory = app.getPath(PREFERENCES_DIRECTORY)
  const path = join(directory, PREFERENCES_FILE)
  const database = await openOrCreate(path)
  dispatch(setPreferncesDatabase(database))
}

export const closePreferencesDatabase = () => async (dispatch, getState) => {
  if (!getPreferencesDatabase(getState())) {
    return
  }

  const database = getPreferencesDatabase(getState())
  await database.close()
  dispatch(setPreferncesDatabase(null))
}

export const setPreferncesDatabase = (database) => ({
  type: t.SET_PREFERENCES_DATABASE,
  payload: { database }
})
