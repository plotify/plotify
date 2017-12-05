import { Database } from '../sqlite'
import validateDatabase from './validate-database'

test('returns Database when called with Database object', () => {
  const database = new Database({})
  expect(validateDatabase(database)).toBe(database)
})

test('throws TypeError when called without argument', () => {
  expect(() => validateDatabase()).toThrow(TypeError)
})

test('throws TypeError when called with invalid Database object', () => {
  expect(() => validateDatabase(123)).toThrow(TypeError)
})
