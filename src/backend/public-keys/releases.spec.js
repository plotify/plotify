import publicKeys from './releases'

test('exports public keys as array', () => {
  expect(Array.isArray(publicKeys)).toBe(true)
})

test('exports one public key', () => {
  expect(publicKeys.length).toBe(1)
})
