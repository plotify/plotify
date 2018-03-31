import { Database } from '../shared/sqlite'
import { create } from './create'
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

  describe('with schema version 1', () => {
    test('updates schema version', async () => {
      const preparedDatabase = await create(path)
      await preparedDatabase.run('PRAGMA user_version = 1')
      await preparedDatabase.close()

      const database = await openOrCreate(path)
      const result = await database.get('PRAGMA user_version')
      await database.close()
      expect(result['user_version']).toBe(3)
    })

    test('updates table recently_opened_files', async () => {
      const preparedDatabase = await create(path)
      await preparedDatabase.run('PRAGMA user_version = 1')
      await preparedDatabase.run('DROP TABLE recently_opened_files')
      await preparedDatabase.close()

      const database = await openOrCreate(path)
      const tables = await database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
      await database.close()
      expect(tables).toContainEqual({ name: 'recently_opened_files' })
    })
  })

  describe('with schema version 2', () => {
    test('updates schema version', async () => {
      const preparedDatabase = await create(path)
      await preparedDatabase.run('PRAGMA user_version = 2')
      await preparedDatabase.close()

      const database = await openOrCreate(path)
      const result = await database.get('PRAGMA user_version')
      await database.close()
      expect(result['user_version']).toBe(3)
    })

    test('deletes table window', async () => {
      const preparedDatabase = await create(path)
      await preparedDatabase.run('PRAGMA user_version = 2')
      await preparedDatabase.run('CREATE TABLE `window` ( `id` INTEGER NOT NULL DEFAULT 1 CHECK(id = 1) )')
      await preparedDatabase.close()

      const database = await openOrCreate(path)
      const tables = await database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
      await database.close()
      expect(tables).not.toContainEqual({ name: 'window' })
    })
  })

  describe('with unsupported schema version', () => {
    test('throws Error', async () => {
      const preparedDatabase = await create(path)
      await preparedDatabase.run('PRAGMA user_version = -1')
      await preparedDatabase.close()
      return expect(openOrCreate(path)).rejects.toBeInstanceOf(Error)
    })
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
