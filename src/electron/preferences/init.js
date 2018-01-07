import { app } from 'electron'
import { join } from 'path'
import { openOrCreate } from '../../backend/preferences'
import { setPreferences } from './current'

const PREFERENCES_DIRECTORY = 'userData'
const PREFERENCES_FILE = 'plotify.preferences.db'

const init = async () => {
  const directory = app.getPath(PREFERENCES_DIRECTORY)
  const path = join(directory, PREFERENCES_FILE)
  const database = await openOrCreate(path)
  setPreferences(database)
}

export default init
