import create from './create'
import { existsSync } from 'fs'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync()
})

test('creates new file when called with valid path', async () => {
  expect(existsSync(path)).toBe(false)
  await create(path)
  expect(existsSync(path)).toBe(true)
})

// TODO Test created file

test('rejects when called with invalid path', () => {
  return expect(create(123)).rejects.toBeInstanceOf(TypeError)
})
