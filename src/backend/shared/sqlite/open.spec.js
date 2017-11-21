import { existsSync, unlinkSync } from 'fs'

import Database from './database'
import mode from './mode'
import open from './open'
import { tmpNameSync } from 'tmp'

const createMode = mode.OPEN_CREATE | mode.OPEN_READWRITE

let path
beforeEach(() => {
  path = tmpNameSync()
})
afterEach(() => {
  if (existsSync(path)) {
    unlinkSync(path)
  }
})

test('resolves to database connection when called with valid path and mode', () => {
  return expect(open(path, createMode)).resolves.toBeInstanceOf(Database)
})

test('creates new file when called with valid path and mode OPEN_CREATE | OPEN_READWRITE', async () => {
  expect(existsSync(path)).toBe(false)
  await open(path, createMode)
  expect(existsSync(path)).toBe(true)
})

test('rejects when file could not be opened', () => {
  // path = Not existing file
  return expect(open(path, mode.OPEN_READWRITE)).rejects.toBeDefined()
})

test('throws TypeError when called with invalid path', () => {
  expect(() => open(123, createMode)).toThrow(TypeError)
})

test('throws TypeError when called with invalid mode', () => {
  expect(() => open(path, -1)).toThrow(TypeError)
  expect(() => open(path, 8)).toThrow(TypeError)
})
