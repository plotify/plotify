import ConnectionAlreadyClosedError from './connection-already-closed-error'
import Lock from 'shared-exclusive-lock'

export default class Database {
  constructor (connection) {
    this._connection = validateConnection(connection)
    this._closed = false
    this._lock = new Lock()
  }

  get closed () {
    return this._closed
  }

  async close () {
    const release = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await close(this._connection)
      this._closed = true
    } finally {
      release()
    }
  }

  async exec (sql) {
    validateSql(sql)
    const release = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await exec(this._connection, sql)
    } finally {
      release()
    }
  }

  async run (sql, params) {
    validateSql(sql)
    validateParams(params)
    const release = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await run(this._connection, sql, params)
    } finally {
      release()
    }
  }

  async get (sql, params) {
    validateSql(sql)
    validateParams(params)
    const release = await this._lock.readLock()
    try {
      validateClosedStatus(this)
      return get(this._connection, sql, params)
    } finally {
      release()
    }
  }

  async all (sql, params) {
    validateSql(sql)
    validateParams(params)
    const release = await this._lock.readLock()
    try {
      validateClosedStatus(this)
      return all(this._connection, sql, params)
    } finally {
      release()
    }
  }
}

// Validation:

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

// Callbacks --> Promises:

const close = (connection) => {
  return new Promise((resolve, reject) => {
    connection.close((error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const exec = (connection, sql) => {
  return new Promise((resolve, reject) => {
    connection.exec(sql, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const run = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.run(sql, params, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const get = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.get(sql, params, (error, row) => {
      if (error) {
        reject(error)
      } else {
        resolve(row)
      }
    })
  })
}

const all = (connection, sql, params) => {
  return new Promise((resolve, reject) => {
    connection.all(sql, params, (error, rows) => {
      if (error) {
        reject(error)
      } else {
        resolve(rows)
      }
    })
  })
}
