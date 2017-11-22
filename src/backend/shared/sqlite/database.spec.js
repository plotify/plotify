import Database from './database'

let connection
let database
beforeEach(() => {
  connection = {
    close: jest.fn(callback => callback()),
    exec: jest.fn((sql, callback) => callback()),
    run: jest.fn((sql, params, callback) => callback())
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

  test('throws TypeError when called without argument', () => {
    expect(() => database.exec()).toThrow(TypeError)
  })

  test('throws TypeError when called without an SQL statement', () => {
    expect(() => database.exec(123)).toThrow(TypeError)
  })

  test('throws TypeError when called with null', () => {
    expect(() => database.exec(null)).toThrow(TypeError)
  })
})

describe('#run', () => {
  const sql = 'UPDATE example SET name = ? WHERE id = ?'
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
  })

  test('throws TypeError when called without argument', () => {
    expect(() => database.run()).toThrow(TypeError)
  })

  test('throws TypeError when called without an SQL statement', () => {
    expect(() => database.run(123)).toThrow(TypeError)
  })

  test('throws TypeError when called with null', () => {
    expect(() => database.run(null)).toThrow(TypeError)
  })

  test('throws TypeError when no array is used for the parameters', () => {
    expect(() => database.run(sql, 'Max', 1)).toThrow(TypeError)
  })
})
