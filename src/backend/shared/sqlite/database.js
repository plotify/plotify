export default class Database {
  constructor (connection) {
    if (connection === null || typeof connection !== 'object') {
      throw new TypeError('connection must be an object.')
    }
    this.connection = connection
  }

  close () {
    return new Promise((resolve, reject) => {
      this.connection.close((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  exec (sql) {
    validateSql(sql)
    return new Promise((resolve, reject) => {
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
    validateSql(sql)
    validateParams(params)
    return new Promise((resolve, reject) => {
      this.connection.run(sql, params, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
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
