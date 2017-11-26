import ConnectionAlreadyClosedError from './connection-already-closed-error'

test('extends Error', () => {
  expect(new ConnectionAlreadyClosedError()).toBeInstanceOf(Error)
})
