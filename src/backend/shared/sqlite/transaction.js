export default class Transaction {
  constructor (database, releaseTransactionLock) {
    this._database = validateDatabase(database)
    this._releaseTransactionLock = releaseTransactionLock
    this._closed = false
  }

  get closed () {
    return this._closed
  }

  async commit () {
    await this.run('commit')
    this._closed = true
    this._releaseTransactionLock()
  }

  async rollback () {
    await this.run('rollback')
    this._closed = true
    this._releaseTransactionLock()
  }

  async run (sql, params) {
    validateClosedStatus(this)
    params = params || []
    return this._database.run(sql, params, this)
  }

  async get (sql, params) {
    validateClosedStatus(this)
    params = params || []
    return this._database.get(sql, params, this)
  }

  async all (sql, params) {
    validateClosedStatus(this)
    params = params || []
    return this._database.all(sql, params, this)
  }
}

const validateDatabase = (database) => {
  if (database !== null && typeof database === 'object') {
    return database
  } else {
    throw new TypeError('database must be an object.')
  }
}

const validateClosedStatus = (transaction) => {
  if (transaction._closed) {
    throw new Error('transaction already closed.')
  }
}
