import validatePath from './validate-path'

test('does not throw TypeError when called with valid path', () => {
  validatePath('/foo/bar')
})

test('throws TypeError when called without argument', () => {
  expect(() => validatePath()).toThrow(TypeError)
})

test('throws TypeError when called with invalid path', () => {
  expect(() => validatePath(123)).toThrow(TypeError)
})
