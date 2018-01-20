import handleNewWindow from './new-window'
import { shell } from 'electron'

let event
beforeEach(() => {
  shell.openExternal.mockReset()
  event = {
    preventDefault: jest.fn()
  }
})

describe('with valid url', () => {
  test('opens external application when called with http url', () => {
    const url = 'https://plotify.org'
    handleNewWindow(event, url)
    expect(shell.openExternal.mock.calls.length).toBe(1)
    expect(shell.openExternal.mock.calls[0][0]).toEqual(url)
  })

  test('opens external application when called with https url', () => {
    const url = 'https://electronjs.org/'
    handleNewWindow(event, url)
    expect(shell.openExternal.mock.calls.length).toBe(1)
    expect(shell.openExternal.mock.calls[0][0]).toEqual(url)
  })

  test('prevents default event handling when called without http or https url', () => {
    handleNewWindow(event, 'mailto:contact@example.com')
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })
})

describe('with invalid url', () => {
  test('prevents default event handling when called without url', () => {
    expect(() => handleNewWindow(event)).toThrow()
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })

  test('prevents default event handling when called with invalid url', () => {
    expect(() => handleNewWindow(event, 'invalid url')).toThrow()
    expect(event.preventDefault.mock.calls.length).toBe(1)
  })
})
