import { Database, mode, open } from './'

test('exports open function', () => {
  expect(open).toBeInstanceOf(Function)
})

test('exports mode constants as object', () => {
  expect(mode).toBeInstanceOf(Object)
})

test('exports Database class', () => {
  expect(Database).toBeInstanceOf(Function)
})
