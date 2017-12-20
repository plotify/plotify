import ConnectionAlreadyClosedError from './connection-already-closed-error'
import Lock from 'shared-exclusive-lock'
import Transaction from './transaction'

export default class Database {
  constructor (connection) {
    this._connection = validateConnection(connection)
    this._closed = false
    this._lock = new Lock()
    this._transactionLock = new Lock()
    this._transaction = null
  }

  get closed () {
    return this._closed
  }

  async close () {
    const releaseTransactionLock = await handleTransaction(this)
    const releaseWriteLock = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await close(this._connection)
      this._closed = true
    } finally {
      releaseWriteLock()
      releaseTransactionLock()
    }
  }

  async beginTransaction () {
    const releaseTransactionLock = await this._transactionLock.writeLock()
    try {
      this._transaction = new Transaction(this, releaseTransactionLock)
      await this._transaction.run('begin')
      return this._transaction
    } catch (error) {
      releaseTransactionLock()
      throw error
    }
  }

  async exec (sql) {
    validateSql(sql)
    const releaseTransactionLock = await handleTransaction(this)
    const releaseWriteLock = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await exec(this._connection, sql)
    } finally {
      releaseWriteLock()
      releaseTransactionLock()
    }
  }

  async run (sql, params, transaction) {
    validateSql(sql)
    validateParams(params)
    const releaseTransactionLock = await handleTransaction(this, transaction)
    const releaseWriteLock = await this._lock.writeLock()
    try {
      validateClosedStatus(this)
      await run(this._connection, sql, params)
    } finally {
      releaseWriteLock()
      releaseTransactionLock()
    }
  }

  async get (sql, params, transaction) {
    validateSql(sql)
    validateParams(params)
    const releaseTransactionLock = await handleTransaction(this, transaction)
    const releaseReadLock = await this._lock.readLock()
    try {
      validateClosedStatus(this)
      return await get(this._connection, sql, params)
    } finally {
      releaseReadLock()
      releaseTransactionLock()
    }
  }

  async all (sql, params, transaction) {
    validateSql(sql)
    validateParams(params)
    const releaseTransactionLock = await handleTransaction(this, transaction)
    const releaseReadLock = await this._lock.readLock()
    try {
      validateClosedStatus(this)
      return await all(this._connection, sql, params)
    } finally {
      releaseReadLock()
      releaseTransactionLock()
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

// Transactions:

const handleTransaction = async (database, transaction) => {
  if (database._transaction === transaction) {
    return () => {}
  } else {
    return database._transactionLock.readLock()
  }
}
