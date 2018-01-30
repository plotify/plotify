import { releases } from './'

test('exports releases public keys', () => {
  expect(Array.isArray(releases)).toBe(true)
})
