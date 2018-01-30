import { LATEST_URL } from './constants'
import checkUpdates from './check-updates'
import request from 'request-promise-native'

const latestFile = `{
  "stable": {
    "linux": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    },
    "macos": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    },
    "windows": {
      "version": "0.1.0",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.1.0"
    }
  },
  "pre-release": {
    "linux": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    },
    "macos": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    },
    "windows": {
      "version": "0.2.0-alpha.2",
      "url": "https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2"
    }
  }
}`
const latestFileSignature = Buffer.from('iQIcBAEBCAAGBQJabLhfAAoJEEkHbY86a/zUdBMP/AkdXb3wy4vOPbzgpKnnccKdpEqCJkotWLy/zrfzRLfUAaLfUimLtMifleuHM9vUZQg5pV061n2C4nXVvYMxZYYQFQdYjP/sx8UdIeY9sjX+DfaF6KvDAOuO+/Vv6fMLAyfDf7cgq/mjCKv6P77vnIjx+puIYixUs4iqUrwiEbU1TxLH+QlfNDp5CgKHvdyVq50rNHbmdwiuneXByB21JBc9mBkuWrp47YLhrbzc9Pa/3sHXY0f1sVPitQN26kKLGnQqq0ARu4Xn6/m37YUkVeNWxwbqSkU6eL93sc54wQk72wc9Shy36bd3T8H4TH1bzPXee5aBpJ+A5UOm6XBIgIRLGrG4Tnf77+DbsIqUPFgSpDg7UEYUkQGL0X7l7BI9Ebv3TjoUppLzqv+FhB0Fcm0HdFVNo08f1CYx3MYwH2WX4DyrUOuLSShcZ1UKjSSQOtgblAmcYbkFHDSa+P4AWI+Dlc+B3jHwDWaPBlIZ2dMqa3ukILUI8ecVUiZQ+e93PxTO/FOo7TmJ7XU0wPdUCJPuxsoVx9eOYdVb+TDfv1O+m80IhSIBqpUMWeSN+64O1/mutpo/oPrFn4g93blvaTkLECLKzJwoWiUI3C0ACOFE3uZjOEes0kY3SFe1vnarhO9/PpIJS+HIPHy8iygpNBwc1G5xD+F8KMKMoqd2DwAX', 'base64')

beforeEach(() => {
  request.mockImplementation((arg) => {
    if (arg === LATEST_URL) {
      return latestFile
    } else {
      return latestFileSignature
    }
  })
})

test('returns null if no update is available', async () => {
  await expect(checkUpdates('0.1.0')).resolves.toBeNull()
  await expect(checkUpdates('0.2.0-alpha.2')).resolves.toBeNull()
})

test('returns new stable version if an update is available', async () => {
  const expected = {
    version: '0.1.0',
    url: 'https://github.com/plotify/plotify/releases/tag/v0.1.0'
  }
  await expect(checkUpdates('0.0.1')).resolves.toEqual(expected)
})

test('returns new pre-release version if an update is available', async () => {
  const expected = {
    version: '0.2.0-alpha.2',
    url: 'https://github.com/plotify/plotify/releases/tag/v0.2.0-alpha.2'
  }
  await expect(checkUpdates('0.2.0-alpha.1')).resolves.toEqual(expected)
})
