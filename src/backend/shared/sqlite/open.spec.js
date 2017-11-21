import { existsSync, unlinkSync } from 'fs'

import mode from './mode'
import open from './open'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync()
})
afterEach(() => {
  if (existsSync(path)) {
    unlinkSync(path)
  }
})

test('creates new file when called with valid path and OPEN_CREATE|OPEN_READWRITE mode', async () => {
  expect(existsSync(path)).toBe(false)
  await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
  expect(existsSync(path)).toBe(true)
})

test('rejects when file could not be opened', () => {
  // path = Not existing file
  return expect(open(path, mode.OPEN_READWRITE)).rejects.toBeDefined()
})

test('throws TypeError when called with invalid path', () => {
  expect(() => open(123)).toThrow(TypeError)
})

test('throws TypeError when called with invalid mode', () => {
  expect(() => open(path, -1)).toThrow(TypeError)
  expect(() => open(path, 8)).toThrow(TypeError)
})
