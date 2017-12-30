import { validateDatabase, validatePath } from '../shared/validation'

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
