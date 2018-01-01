import handleClose from './close'
import handleClosed from './closed'
import handleContextMenu from './context-menu'
import handleNewWindow from './new-window'
import handleReadyToShow from './ready-to-show'
import handleWillNavigate from './will-navigate'
import initEventHandlers from './'

let window
beforeEach(() => {
  window = {
    on: jest.fn(),
    once: jest.fn(),
    webContents: {
      on: jest.fn()
    }
  }
})

test('adds event handler for ready-to-show event', () => {
  initEventHandlers(window)
  expect(window.once.mock.calls[0][0]).toEqual('ready-to-show')
  expect(window.once.mock.calls[0][1]).toBe(handleReadyToShow)
})

test('adds event handler for close events', () => {
  initEventHandlers(window)
  expect(window.on.mock.calls[0][0]).toEqual('close')
  expect(window.on.mock.calls[0][1]).toBe(handleClose)
})

test('adds event handler for closed event', () => {
  initEventHandlers(window)
  expect(window.once.mock.calls[1][0]).toEqual('closed')
  expect(window.once.mock.calls[1][1]).toBe(handleClosed)
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

test('adds event handler for context-menu events', () => {
  initEventHandlers(window)
  expect(window.webContents.on.mock.calls[2][0]).toEqual('context-menu')
  expect(window.webContents.on.mock.calls[2][1]).toBe(handleContextMenu)
})
