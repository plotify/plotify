import validatePath from './validate-path'

test('returns path when called with valid path', () => {
  const path = '/foo/bar'
  expect(validatePath(path)).toBe(path)
})

test('throws TypeError when called without argument', () => {
  expect(() => validatePath()).toThrow(TypeError)
})

test('throws TypeError when called with invalid path', () => {
  expect(() => validatePath(123)).toThrow(TypeError)
})
