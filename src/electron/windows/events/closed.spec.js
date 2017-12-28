import { addWindow, getNumberOfWindows } from '../windows'

import handleClosed from './closed'

test('removes window', () => {
  const window = {}
  addWindow(window)
  expect(getNumberOfWindows()).toBe(1)
  handleClosed({ sender: window })
  expect(getNumberOfWindows()).toBe(0)
})
