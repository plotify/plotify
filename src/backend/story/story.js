import { ConnectionAlreadyClosedError, Database } from '../shared/sqlite'

import { validatePath } from '../shared/validation'

export default class Story {
  constructor (path, database) {
    this._path = validatePath(path)
    this._database = validateDatabase(database)
  }

  get path () {
    return this._path
  }

  get database () {
    return this._database
  }

  close () {
    return this._database.close()
  }
}

const validateDatabase = (database) => {
  if (!(database instanceof Database)) {
    throw new TypeError('database must be an instance of class Database.')
  }
  if (database.closed) {
    throw new ConnectionAlreadyClosedError()
  }
  return database
}
