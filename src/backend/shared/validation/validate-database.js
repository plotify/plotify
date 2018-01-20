import { ConnectionAlreadyClosedError, Database, Transaction } from '../sqlite'

const validateDatabase = (database) => {
  if (!(database instanceof Database) &&
      !(database instanceof Transaction)) {
    throw new TypeError('database must be an instance of class Database or Transaction.')
  }
  if (database.closed) {
    throw new ConnectionAlreadyClosedError()
  }
  return database
}

export default validateDatabase
