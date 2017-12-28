import { isWindowReady, setWindowStoryPath } from '../windows'

import handleReadyToShow from './ready-to-show'

let window
let event
beforeEach(() => {
  window = {
    maximize: jest.fn(),
    show: jest.fn()
  }
  event = { sender: window }
})

describe('without story path', () => {
  beforeEach(() => {
    setWindowStoryPath(window, '')
    handleReadyToShow(event)
  })

  test('sets window status to ready', () => {
    expect(isWindowReady(window)).toBe(true)
  })

  test('maximizes and shows window', () => {
    expect(window.maximize.mock.calls.length).toBe(1)
    expect(window.show.mock.calls.length).toBe(1)
  })
})
