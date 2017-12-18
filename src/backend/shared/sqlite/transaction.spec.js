import Database from './database'
import Transaction from './transaction'

let connection
let database
let releaseTransactionLock
let transaction
beforeEach(() => {
  connection = {
    run: jest.fn((sql, params, callback) => callback()),
    get: jest.fn((sql, params, callback) => callback(null, undefined)),
    all: jest.fn((sql, params, callback) => callback(null, []))
  }
  database = new Database(connection)
  releaseTransactionLock = jest.fn()
  transaction = new Transaction(database, releaseTransactionLock)
})

describe('#constructor', () => {
  test('constructs object when called with valid arguments', () => {
    expect(typeof new Transaction(database, releaseTransactionLock)).toBe('object')
  })

  test('throws TypeError when called without arguments', () => {
    expect(() => new Transaction()).toThrow(TypeError)
  })

  test('throws TypeError when called with invalid Database object', () => {
    expect(() => new Transaction('invalid', releaseTransactionLock)).toThrow(TypeError)
  })

  test('throws TypeError when called without release function', () => {
    expect(() => new Transaction(database)).toThrow(TypeError)
  })

  test('throws TypeError when called with null as release function', () => {
    expect(() => new Transaction(database, null)).toThrow(TypeError)
  })

  test('throws TypeError when called with invalid release function', () => {
    expect(() => new Transaction(database, 'invalid')).toThrow(TypeError)
  })
})

describe('#closed', () => {
  test('returns false when transaction is not closed', () => {
    expect(transaction.closed).toBe(false)
  })

  test('returns true when transaction is closed', async () => {
    await transaction.commit()
    expect(transaction.closed).toBe(true)
  })
})

describe('#commit', () => {
  test('commits transaction', async () => {
    await transaction.commit()
    expect(connection.run.mock.calls.length).toBe(1)
    expect(connection.run.mock.calls[0][0]).toBe('commit')
    expect(transaction.closed).toBe(true)
  })

  test('releases transaction lock when commit was successful', async () => {
    await transaction.commit()
    expect(releaseTransactionLock.mock.calls.length).toBe(1)
  })

  test('does not release transaction lock when commit failed', async (done) => {
    const error = new Error()
    connection.run = jest.fn(() => { throw error })
    try {
      await transaction.commit()
      done.fail()
    } catch (error) {
      expect(error).toBe(error)
      expect(transaction.closed).toBe(false)
      done()
    }
  })

  test('rejects when transaction was already closed', () => {
    transaction._closed = true
    return expect(transaction.commit()).rejects.toHaveProperty('message', 'transaction already closed.')
  })
})

describe('#rollback', () => {
  test('rollbacks transaction', async () => {
    await transaction.rollback()
    expect(connection.run.mock.calls.length).toBe(1)
    expect(connection.run.mock.calls[0][0]).toBe('rollback')
    expect(transaction.closed).toBe(true)
  })

  test('releases transaction lock when rollback was successful', async () => {
    await transaction.rollback()
    expect(releaseTransactionLock.mock.calls.length).toBe(1)
  })

  test('does not release transaction lock when rollback failed', async (done) => {
    const error = new Error()
    connection.run = jest.fn(() => { throw error })
    try {
      await transaction.rollback()
      done.fail()
    } catch (error) {
      expect(error).toBe(error)
      expect(transaction.closed).toBe(false)
      done()
    }
  })

  test('rejects when transaction is already closed', () => {
    transaction._closed = true
    return expect(transaction.rollback()).rejects.toHaveProperty('message', 'transaction already closed.')
  })
})

describe('#run', () => {
  const sql = 'UPDATE example SET name = ? WHERE id = ?;'
  const params = ['Max', 1]

  test('executes SQL statement', async () => {
    await transaction.run(sql, params)
    expect(connection.run.mock.calls.length).toBe(1)
    expect(connection.run.mock.calls[0][0]).toBe(sql)
    expect(connection.run.mock.calls[0][1]).toBe(params)
  })

  test('rejects when transaction is already closed', () => {
    transaction._closed = true
    return expect(transaction.run(sql, params)).rejects.toHaveProperty('message', 'transaction already closed.')
  })
})

describe('#get', () => {
  const sql = 'SELECT foo FROM bar WHERE id = ?;'
  const params = [1]
  const row = { foo: 'Hello world' }

  test('resolves to row when the SQL statement was executed successfully', () => {
    connection.get = jest.fn((sql, params, callback) => callback(null, row))
    return expect(transaction.get(sql)).resolves.toBe(row)
  })

  test('executes SQL statement', async () => {
    await transaction.get(sql, params)
    expect(connection.get.mock.calls.length).toBe(1)
    expect(connection.get.mock.calls[0][0]).toBe(sql)
    expect(connection.get.mock.calls[0][1]).toBe(params)
  })

  test('rejects when transaction is already closed', () => {
    transaction._closed = true
    return expect(transaction.get(sql, params)).rejects.toHaveProperty('message', 'transaction already closed.')
  })
})

describe('#all', () => {
  const sql = 'SELECT foo FROM bar WHERE foo > ?'
  const params = [123]
  const rows = [ { foo: 'Hello world' }, { foo: 'Lorem ipsum' } ]

  test('resolves to array of rows when the SQL statement was executed successfully', () => {
    connection.all = jest.fn((sql, params, callback) => callback(null, rows))
    return expect(transaction.all(sql)).resolves.toBe(rows)
  })

  test('executes SQL statement', async () => {
    await transaction.all(sql, params)
    expect(connection.all.mock.calls.length).toBe(1)
    expect(connection.all.mock.calls[0][0]).toBe(sql)
    expect(connection.all.mock.calls[0][1]).toBe(params)
  })

  test('rejects when transaction is already closed', () => {
    transaction._closed = true
    return expect(transaction.all(sql, params)).rejects.toHaveProperty('message', 'transaction already closed.')
  })
})
