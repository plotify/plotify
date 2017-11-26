import ConnectionAlreadyClosedError from './connection-already-closed-error'

export default class Database {
  constructor (connection) {
    if (connection === null || typeof connection !== 'object') {
      throw new TypeError('connection must be an object.')
    }
    this.connection = connection
    this.closed = false
  }

  isClosed () {
    return this.closed
  }

  close () {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      this.connection.close((error) => {
        if (error) {
          reject(error)
        } else {
          this.closed = true
          resolve()
        }
      })
    })
  }

  exec (sql) {
    return new Promise((resolve, reject) => {
      validateClosedStatus(this)
      validateSql(sql)
      this.connection.exec(sql, (error) => {
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
      this.connection.run(sql, params, (error) => {
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
      this.connection.get(sql, params, (error, row) => {
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
      this.connection.all(sql, params, (error, rows) => {
        if (error) {
          reject(error)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

const validateClosedStatus = (database) => {
  if (database.closed) {
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
