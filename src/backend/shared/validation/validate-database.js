import { ConnectionAlreadyClosedError, Database } from '../sqlite'

const validateDatabase = (database) => {
  if (!(database instanceof Database)) {
    throw new TypeError('database must be an instance of class Database.')
  }
  if (database.closed) {
    throw new ConnectionAlreadyClosedError()
  }
  return database
}

export default validateDatabase
