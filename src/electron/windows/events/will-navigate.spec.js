import handleWillNavigate from './will-navigate'

let event
beforeEach(() => {
  event = {
    preventDefault: jest.fn()
  }
})

describe('with valid url', () => {
  test('does not prevent default event handling when called with localhost', () => {
    handleWillNavigate(event, 'http://localhost')
    expect(event.preventDefault.mock.calls.length).toBe(0)
  })

  test('does not prevent default event handling when called with local ip address', () => {
    handleWillNavigate(event, 'http://127.0.0.1')
    expect(event.preventDefault.mock.calls.length).toBe(0)
  })

  test('does not prevent default event handling when called with localhost and port', () => {
    handleWillNavigate(event, 'https://localhost:8080')
    expect(event.preventDefault.mock.calls.length).toBe(0)
  })

  test('does not prevent default event handling when called with local ip address and port', () => {
    handleWillNavigate(event, 'http://127.0.0.1:43')
    expect(event.preventDefault.mock.calls.length).toBe(0)
  })

  test('prevents default event handling when called with not-local domain', () => {
    handleWillNavigate(event, 'http://plotify.org')
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })

  test('prevents default event handling when called with not-local ip address', () => {
    handleWillNavigate(event, 'https://8.8.8.8')
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })
})

describe('with invalid url', () => {
  test('prevents default event handling when called without url', () => {
    expect(() => handleWillNavigate(event)).toThrow()
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })

  test('prevents default event handling when called with invalid url', () => {
    expect(() => handleWillNavigate(event, 'invalid url')).toThrow()
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })
})
