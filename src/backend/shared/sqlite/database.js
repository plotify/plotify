import ConnectionAlreadyClosedError from './connection-already-closed-error'

export default class Database {
  constructor (connection) {
    this._connection = validateConnection(connection)
    this._closed = false
  }

  get closed () {
    return this._closed
  }

  close () {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      this._connection.close((error) => {
        if (error) {
          reject(error)
        } else {
          this._closed = true
          resolve()
        }
      })
    })
  }

  exec (sql) {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      validateSql(sql)
      this._connection.exec(sql, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  run (sql, params) {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      validateSql(sql)
      validateParams(params)
      this._connection.run(sql, params, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  get (sql, params) {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      validateSql(sql)
      validateParams(params)
      this._connection.get(sql, params, (error, row) => {
        if (error) {
          reject(error)
        } else {
          resolve(row)
        }
      })
    })
  }

  all (sql, params) {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      validateSql(sql)
      validateParams(params)
      this._connection.all(sql, params, (error, rows) => {
        if (error) {
          reject(error)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

const validateConnection = (connection) => {
  if (connection !== null && typeof connection === 'object') {
    return connection
  } else {
    throw new TypeError('connection must be an object.')
  }
}

const validateClosedStatus = (database) => {
  if (database._closed) {
    throw new ConnectionAlreadyClosedError()
  }
}

const validateSql = (sql) => {
  if (sql === null || typeof sql !== 'string') {
    throw new TypeError('sql must be a string.')
  }
}

const validateParams = (params) => {
  if (params !== undefined && !Array.isArray(params)) {
    throw new TypeError('params must be an array.')
  }
}
