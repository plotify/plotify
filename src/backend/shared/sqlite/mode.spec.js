import mode from './mode'

test('exports three constants', () => {
  expect(mode).toHaveProperty('OPEN_READONLY')
  expect(mode).toHaveProperty('OPEN_READWRITE')
  expect(mode).toHaveProperty('OPEN_CREATE')
})
