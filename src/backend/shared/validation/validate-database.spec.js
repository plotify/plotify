import { Database } from '../sqlite'
import validateDatabase from './validate-database'

let database
beforeEach(() => {
  database = new Database({
    close: jest.fn(callback => callback())
  })
})

test('returns Database when called with Database object', () => {
  expect(validateDatabase(database)).toBe(database)
})

test('throws TypeError when called without argument', () => {
  expect(() => validateDatabase()).toThrow(TypeError)
})

test('throws TypeError when called with invalid Database object', () => {
  expect(() => validateDatabase(123)).toThrow(TypeError)
})

test('throws Error when called with already closed database connection', async () => {
  await database.close()
  expect(() => validateDatabase(database)).toThrow(Error)
})
