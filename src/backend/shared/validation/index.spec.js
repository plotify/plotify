import { validateDatabase, validatePath } from './'

test('exports validatePath function', () => {
  expect(validatePath).toBeInstanceOf(Function)
})

test('exports validateDatabase function', () => {
  expect(validateDatabase).toBeInstanceOf(Function)
})
