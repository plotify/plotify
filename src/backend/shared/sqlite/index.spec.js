import { ConnectionAlreadyClosedError, Database, Transaction, mode, open } from './'

test('exports open function', () => {
  expect(open).toBeInstanceOf(Function)
})

test('exports mode constants as object', () => {
  expect(mode).toBeInstanceOf(Object)
})

test('exports Database class', () => {
  expect(Database).toBeInstanceOf(Function)
})

test('exports Transaction class', () => {
  expect(Transaction).toBeInstanceOf(Function)
})

test('exports ConnectionAlreadyClosedError class', () => {
  expect(ConnectionAlreadyClosedError).toBeInstanceOf(Function)
})
