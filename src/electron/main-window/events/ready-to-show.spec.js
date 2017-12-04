import handleReadyToShow from './ready-to-show'

test('maximizes and shows BrowserWindow', () => {
  const event = {
    sender: {
      maximize: jest.fn(),
      show: jest.fn()
    }
  }
  handleReadyToShow(event)
  expect(event.sender.maximize.mock.calls.length).toBe(1)
  expect(event.sender.show.mock.calls.length).toBe(1)
})
