import handleReadyToShow from './ready-to-show'

test('shows BrowserWindow', () => {
  const event = {
    sender: {
      show: jest.fn()
    }
  }
  handleReadyToShow(event)
  expect(event.sender.show.mock.calls.length).toBe(1)
})
