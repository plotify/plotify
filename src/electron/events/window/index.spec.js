import handleNewWindow from './new-window'
import initEventHandlers from './'

let window
beforeEach(() => {
  window = {
    webContents: {
      on: jest.fn()
    }
  }
})

test('adds event handler for new-window events', () => {
  initEventHandlers(window)
  expect(window.webContents.on.mock.calls.length).toBeGreaterThanOrEqual(1)
  expect(window.webContents.on.mock.calls[0][0]).toEqual('new-window')
  expect(window.webContents.on.mock.calls[0][1]).toBe(handleNewWindow)
})
