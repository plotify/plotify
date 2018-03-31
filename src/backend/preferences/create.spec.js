import { Database, mode, open } from '../shared/sqlite'
import { create, createSchema } from './create'

import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync({ postfix: '.preferences.db' })
})

describe('#create', () => {
  test('returns instance of Database when called with valid path', async () => {
    const database = await create(path)
    await database.close()
    expect(database).toBeInstanceOf(Database)
  })

  test('creates new SQLite database with initial tables when called with valid path', async () => {
    const database = await create(path)
    await checkTables(database)
  })

  test('rejects when called with invalid path', () => {
    return expect(create(123)).rejects.toBeInstanceOf(TypeError)
  })
})

describe('#createSchema', () => {
  test('creates initial tables when called with database', async () => {
    const database = await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
    await createSchema(database)
    await checkTables(database)
  })

  test('rejects when called without database', () => {
    return expect(createSchema()).rejects.toBeInstanceOf(TypeError)
  })
})

const checkTables = async (database) => {
  const tables = await database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
  expect(tables.length).toBe(2)
  expect(tables).toContainEqual({ name: 'appearance' })
  expect(tables).toContainEqual({ name: 'recently_opened_files' })
}
