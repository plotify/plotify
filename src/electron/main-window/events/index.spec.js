import handleNewWindow from './new-window'
import handleReadyToShow from './ready-to-show'
import handleWillNavigate from './will-navigate'
import initEventHandlers from './'

let window
beforeEach(() => {
  window = {
    once: jest.fn(),
    webContents: {
      on: jest.fn()
    }
  }
})

test('adds event handler for one ready-to-show event', () => {
  initEventHandlers(window)
  expect(window.once.mock.calls[0][0]).toEqual('ready-to-show')
  expect(window.once.mock.calls[0][1]).toBe(handleReadyToShow)
})

test('adds event handler for new-window events', () => {
  initEventHandlers(window)
  expect(window.webContents.on.mock.calls[0][0]).toEqual('new-window')
  expect(window.webContents.on.mock.calls[0][1]).toBe(handleNewWindow)
})

test('adds event handler for will-navigate events', () => {
  initEventHandlers(window)
  expect(window.webContents.on.mock.calls[1][0]).toEqual('will-navigate')
  expect(window.webContents.on.mock.calls[1][1]).toBe(handleWillNavigate)
})
