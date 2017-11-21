import Database from './database'

let connection
let database
beforeEach(() => {
  connection = {
    close: jest.fn(callback => callback()),
    exec: jest.fn((sql, callback) => callback())
  }
  database = new Database(connection)
})

describe('#constructor', () => {
  test('constructs object when called with object', () => {
    expect(typeof new Database({})).toBe('object')
  })

  test('throws TypeError when called without argument', () => {
    expect(() => new Database()).toThrow(TypeError)
  })

  test('throws TypeError when called without an object', () => {
    expect(() => new Database('foobar')).toThrow(TypeError)
  })

  test('throws TypeError when called with null', () => {
    expect(() => new Database(null)).toThrow(TypeError)
  })
})

describe('#close', () => {
  test('returns a promise', () => {
    expect(database.close()).toBeInstanceOf(Promise)
  })

  test('tries to close the connection', async () => {
    await database.close()
    expect(connection.close.mock.calls.length).toBe(1)
  })

  test('resolves when the connection was closed successfully', () => {
    return expect(database.close()).resolves.toBeUndefined()
  })

  test('rejects when the connection could not be closed', () => {
    const error = new Error()
    connection.close = jest.fn(callback => callback(error))
    return expect(database.close()).rejects.toBe(error)
  })
})

describe('#exec', () => {
  const sql = 'SELECT foo FROM bar;'

  test('returns a promise when called with SQL statement', () => {
    expect(database.exec(sql)).toBeInstanceOf(Promise)
  })

  test('throws TypeError when called without argument', () => {
    expect(() => database.exec()).toThrow(TypeError)
  })

  test('throws TypeError when called without an SQL statement', () => {
    expect(() => database.exec(123)).toThrow(TypeError)
  })

  test('throws TypeError when called with null', () => {
    expect(() => database.exec(null)).toThrow(TypeError)
  })

  test('tries to execute the SQL statement', async () => {
    await database.exec(sql)
    expect(connection.exec.mock.calls.length).toBe(1)
    expect(connection.exec.mock.calls[0][0]).toBe(sql)
  })

  test('resolves when the SQL statement was executed successfully', () => {
    return expect(database.exec(sql)).resolves.toBeUndefined()
  })

  test('rejects when the SQL statement could not be executed', () => {
    const error = new Error()
    connection.exec = jest.fn((sql, callback) => callback(error))
    return expect(database.exec(sql)).rejects.toBe(error)
  })
})