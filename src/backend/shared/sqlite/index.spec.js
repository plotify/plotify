import { mode, open } from './'

test('exports open function', () => {
  expect(open).toBeInstanceOf(Function)
})

test('exports mode constants as object', () => {
  expect(mode).toBeInstanceOf(Object)
})
