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
    if (sql === null || typeof sql !== 'string') {
      throw new TypeError('sql must be a string.')
    }

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
}
