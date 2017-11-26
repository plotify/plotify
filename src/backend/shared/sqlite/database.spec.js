import ConnectionAlreadyClosedError from './connection-already-closed-error'
import Database from './database'

let connection
let database
beforeEach(() => {
  connection = {
    close: jest.fn(callback => callback()),
    exec: jest.fn((sql, callback) => callback()),
    run: jest.fn((sql, params, callback) => callback()),
    get: jest.fn((sql, params, callback) => callback(null, undefined)),
    all: jest.fn((sql, params, callback) => callback(null, []))
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

describe('#isClosed', () => {
  test('returns false if the connection has not been closed', () => {
    expect(database.isClosed()).toBe(false)
  })

  test('returns true if the connection was closed', async () => {
    await database.close()
    expect(database.isClosed()).toBe(true)
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

  test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
    await database.close()
    return expect(database.close()).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
  })
})

describe('#exec', () => {
  const sql = 'SELECT foo FROM bar;'

  test('returns a promise', () => {
    expect(database.exec(sql)).toBeInstanceOf(Promise)
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

  test('rejects to TypeError when called without argument', () => {
    return expect(database.exec()).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called without an SQL statement', () => {
    return expect(database.exec(123)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called with null', () => {
    return expect(database.exec(null)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
    await database.close()
    return expect(database.exec(sql)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
  })
})

describe('#run', () => {
  const sql = 'UPDATE example SET name = ? WHERE id = ?;'
  const params = ['Max', 1]

  describe('with SQL statement and without parameters', () => {
    test('returns a promise', () => {
      expect(database.run(sql)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement', async () => {
      await database.run(sql)
      expect(connection.run.mock.calls.length).toBe(1)
      expect(connection.run.mock.calls[0][0]).toBe(sql)
      expect(connection.run.mock.calls[0][1]).toBe(undefined)
    })

    test('resolves when the SQL statement was executed successfully', () => {
      return expect(database.run(sql)).resolves.toBeUndefined()
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.run = jest.fn((sql, params, callback) => callback(error))
      return expect(database.run(sql)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.run(sql)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })

  describe('with SQL statement and with parameters', () => {
    test('returns a promise', () => {
      expect(database.run(sql, params)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement with parameters', async () => {
      await database.run(sql, params)
      expect(connection.run.mock.calls.length).toBe(1)
      expect(connection.run.mock.calls[0][0]).toBe(sql)
      expect(connection.run.mock.calls[0][1]).toBe(params)
    })

    test('resolves when the SQL statement was executed successfully', () => {
      return expect(database.run(sql, params)).resolves.toBeUndefined()
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.run = jest.fn((sql, params, callback) => callback(error))
      return expect(database.run(sql, params)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.run(sql, params)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })

  test('rejects to TypeError when called without argument', () => {
    return expect(database.run()).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called without an SQL statement', () => {
    return expect(database.run(123)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called with null', () => {
    return expect(database.run(null)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when no array is used for the parameters', () => {
    return expect(database.run(sql, 'Max', 1)).rejects.toBeInstanceOf(TypeError)
  })
})

describe('#get', () => {
  const sql = 'SELECT foo FROM bar WHERE id = ?;'
  const params = [1]
  const row = { foo: 'Hello world' }

  describe('with SQL statement and without parameters', () => {
    test('returns a promise', () => {
      expect(database.get(sql)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement', async () => {
      await database.get(sql)
      expect(connection.get.mock.calls.length).toBe(1)
      expect(connection.get.mock.calls[0][0]).toBe(sql)
      expect(connection.get.mock.calls[0][1]).toBe(undefined)
    })

    test('resolves to row when the SQL statement was executed successfully', () => {
      connection.get = jest.fn((sql, params, callback) => callback(null, row))
      return expect(database.get(sql)).resolves.toBe(row)
    })

    test('resolves to undefined when the SQL statement was executed successfully and the result set is empty', () => {
      return expect(database.get(sql)).resolves.toBeUndefined()
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.get = jest.fn((sql, params, callback) => callback(error))
      return expect(database.get(sql)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.get(sql)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })

  describe('with SQL statement and with parameters', () => {
    test('returns a promise', () => {
      expect(database.get(sql, params)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement with parameters', async () => {
      await database.get(sql, params)
      expect(connection.get.mock.calls.length).toBe(1)
      expect(connection.get.mock.calls[0][0]).toBe(sql)
      expect(connection.get.mock.calls[0][1]).toBe(params)
    })

    test('resolves to row when the SQL statement was executed successfully', () => {
      connection.get = jest.fn((sql, params, callback) => callback(null, row))
      return expect(database.get(sql, params)).resolves.toBe(row)
    })

    test('resolves to undefined when the SQL statement was executed successfully and the result set is empty', () => {
      return expect(database.get(sql, params)).resolves.toBeUndefined()
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.get = jest.fn((sql, params, callback) => callback(error))
      return expect(database.get(sql, params)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.get(sql, params)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })

  test('rejects to TypeError when called without argument', () => {
    return expect(database.get()).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called without an SQL statement', () => {
    return expect(database.get(123)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when called with null', () => {
    return expect(database.get(null)).rejects.toBeInstanceOf(TypeError)
  })

  test('rejects to TypeError when no array is used for the parameters', () => {
    return expect(database.get(sql, 1)).rejects.toBeInstanceOf(TypeError)
  })
})

describe('#all', () => {
  const sql = 'SELECT foo FROM bar WHERE foo > ?'
  const params = [123]
  const rows = [ { foo: 'Hello world' }, { foo: 'Lorem ipsum' } ]

  describe('with SQL statement and without parameters', () => {
    test('returns a promise', () => {
      expect(database.all(sql)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement', async () => {
      await database.all(sql)
      expect(connection.all.mock.calls.length).toBe(1)
      expect(connection.all.mock.calls[0][0]).toBe(sql)
      expect(connection.all.mock.calls[0][1]).toBe(undefined)
    })

    test('resolves to array of rows when the SQL statement was executed successfully', () => {
      connection.all = jest.fn((sql, params, callback) => callback(null, rows))
      return expect(database.all(sql)).resolves.toBe(rows)
    })

    test('resolves to empty array when the SQL statement was executed successfully and the result set is empty', () => {
      return expect(database.all(sql)).resolves.toEqual([])
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.all = jest.fn((sql, params, callback) => callback(error))
      return expect(database.all(sql)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.all(sql)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })

  describe('with SQL statement and with parameters', () => {
    test('returns a promise', () => {
      expect(database.all(sql, params)).toBeInstanceOf(Promise)
    })

    test('tries to execute the SQL statement with parameters', async () => {
      await database.all(sql, params)
      expect(connection.all.mock.calls.length).toBe(1)
      expect(connection.all.mock.calls[0][0]).toBe(sql)
      expect(connection.all.mock.calls[0][1]).toBe(params)
    })

    test('resolves to array of rows when the SQL statement was executed successfully', () => {
      connection.all = jest.fn((sql, params, callback) => callback(null, rows))
      return expect(database.all(sql, params)).resolves.toBe(rows)
    })

    test('resolves to empty array when the SQL statement was executed successfully and the result set is empty', () => {
      return expect(database.all(sql, params)).resolves.toEqual([])
    })

    test('rejects when the SQL statement could not be executed', () => {
      const error = new Error()
      connection.all = jest.fn((sql, params, callback) => callback(error))
      return expect(database.all(sql, params)).rejects.toBe(error)
    })

    test('rejects to ConnectionAlreadyClosedError when the connection was already closed', async () => {
      await database.close()
      return expect(database.all(sql, params)).rejects.toBeInstanceOf(ConnectionAlreadyClosedError)
    })
  })
})
