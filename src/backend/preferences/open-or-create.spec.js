import { Database } from '../shared/sqlite'
import create from './create'
import openOrCreate from './open-or-create'
import { pathExists } from 'fs-extra'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync({ postfix: '.plotify.preferences.db' })
})

describe('with path to existing database', () => {
  test('returns instance of Database', async () => {
    const preparedDatabase = await create(path)
    await preparedDatabase.close()
    const database = await openOrCreate(path)
    await database.close()
    expect(database).toBeInstanceOf(Database)
  })
})

describe('with path to not existing database', () => {
  test('returns instance of Database', async () => {
    const database = await openOrCreate(path)
    await database.close()
    expect(database).toBeInstanceOf(Database)
  })

  test('creates new SQLite database', async () => {
    expect(await pathExists(path)).toBe(false)
    const database = await openOrCreate(path)
    await database.close()
    expect(await pathExists(path)).toBe(true)
  })
})

test('rejects when called with invalid path', () => {
  return expect(openOrCreate(123)).rejects.toBeInstanceOf(TypeError)
})
