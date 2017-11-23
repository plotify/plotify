import { mode, open } from '../shared/sqlite'

import create from './create'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync()
})

test('creates new SQLite database with initial tables when called with valid path', async () => {
  await create(path)
  const database = await open(path, mode.OPEN_READWRITE)
  const tables = await database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
  await database.close()
  expect(tables).toContainEqual({ name: 'character' })
  expect(tables).toContainEqual({ name: 'character_history' })
  expect(tables).toContainEqual({ name: 'entry' })
  expect(tables).toContainEqual({ name: 'entry_history' })
  expect(tables).toContainEqual({ name: 'entry_group' })
  expect(tables).toContainEqual({ name: 'entry_group_history' })
  expect(tables).toContainEqual({ name: 'character_changes_sequence' })
})

test('rejects when called with invalid path', () => {
  return expect(create(123)).rejects.toBeInstanceOf(TypeError)
})
