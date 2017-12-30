import { Database } from '../shared/sqlite'
import create from './create'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync({ postfix: '.preferences.db' })
})

test('returns instance of Database when called with valid path', async () => {
  const database = await create(path)
  await database.close()
  expect(database).toBeInstanceOf(Database)
})

test('creates new SQLite database with initial tables when called with valid path', async () => {
  const database = await create(path)
  const tables = await database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
  await database.close()
  expect(tables).toContainEqual({ name: 'appearance' })
  expect(tables).toContainEqual({ name: 'window' })
  expect(tables).toContainEqual({ name: 'recently_opened_files' })
})

test('rejects when called with invalid path', () => {
  return expect(create(123)).rejects.toBeInstanceOf(TypeError)
})
