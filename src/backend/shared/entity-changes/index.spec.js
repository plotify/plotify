import { addChange, validateType } from './'

test('exports addChange function', () => {
  expect(addChange).toBeInstanceOf(Function)
})

test('exports validateType function', () => {
  expect(validateType).toBeInstanceOf(Function)
})
