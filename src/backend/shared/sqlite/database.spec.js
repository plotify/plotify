import Database from './database'

let connection
let database
beforeEach(() => {
  connection = {
    close: jest.fn(callback => callback())
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
    return database.close()
  })

  test('rejects when the connection could not be closed', () => {
    const error = new Error()
    connection.close = jest.fn(callback => callback(error))
    return expect(database.close()).rejects.toBe(error)
  })
})
