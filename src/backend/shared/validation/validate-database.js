import { Database } from '../sqlite'

const validateDatabase = (database) => {
  if (database instanceof Database) {
    return database
  } else {
    throw new TypeError('No Database: ' + database)
  }
}

export default validateDatabase
